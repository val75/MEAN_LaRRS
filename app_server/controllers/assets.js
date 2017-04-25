/*
 * app_server/controllers/assets.js - Server controller for assets admin
 */

/*jslint        node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */
'use strict';

//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
    request = require('request'),
    async = require('async'),
    apiOptions = {
        server : "http://localhost:3000"
    },

    _showError, renderAssetHome, renderAssetAddForm, renderAssetInfo,
    getSkus, getMfgs,
    assetList, assetInfo, addAsset, doAddAsset, assetEdit, deleteAsset;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
_showError = function (req, res, status) {
    var title, content;

    if (status === 404) {
        title = "404, page not found";
        content = "Looks like we can't find this page, sorry!";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has just gone a little wrong";
    }

    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};

getSkus = function (req, res, callback) {
    var
        requestOptions, path;

    path = '/api/skus';
    requestOptions = {
        url    : apiOptions.server + path,
        method : "GET",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data = body,
                skuList = [];
            if (response.statusCode === 200) {
                data.forEach(function (doc) {
                    skuList.push({
                        _id   : doc._id,
                        name  : doc.name
                    });
                });
                callback(req, res, skuList);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

getMfgs = function (req, res, skuDetail, callback) {
    var
        requestOptions, path;

    path = '/api/manufacturers';
    requestOptions = {
        url    : apiOptions.server + path,
        method : "GET",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data = body,
                mfgList = [];
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    mfgList.push({
                        _id   : doc._id,
                        name  : doc.name
                    });
                });
                callback(req, res, skuDetail, mfgList);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

renderAssetHome = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No assets found here";
        }
    }
    res.render('asset-list', {
        title: 'LaRRS - Lab Reservation and Reclamation System',
        pageHeader: {
            title: 'LaRRS',
            strapline: 'List of lab assets in all HWE Labs'
        },
        assets: responseBody,
        message: message
    });
};

renderAssetAddForm = function (req, res, skuDetail, mfgDetail, locDetail, groupDetail, hstatDetail) {
    res.render('asset-add', {
        title : 'Add Asset',
        pageHeader : {
            title : 'Add Asset',
            strapline : 'Register new asset'
        },
        skus: skuDetail,
        mfgs: mfgDetail,
        locs: locDetail,
        groups: groupDetail,
        hstats: hstatDetail
    });
};

renderAssetInfo = function (req, res, assetDetail) {
    //console.log(assetDetail);
    //console.log(assetDetail.hostname);
    res.render('asset-info', {
        title: assetDetail.hostname,
        pageHeader: {
            title: assetDetail.hostname
        },
        asset: {
            hostname: assetDetail.hostname,
            assetTag: assetDetail.assetTag,
            skuModel: assetDetail.skuModel,
            mfgName: assetDetail.mfgName,
            locName: assetDetail.locName,
            groupName: assetDetail.groupName,
            healthStatus: assetDetail.assetStatus,
            resStatus: assetDetail.resStatus
        }
    });
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
/* GET assets list page */
assetList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/assets';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qa : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data,
                assetList = [];
            data = body;
            if (response.statusCode === 200 && data.length ) {
                data.forEach(function (doc) {
                    //console.log(doc);
                    assetList.push({
                        _id: doc._id,
                        hostname: doc.hostname,
                        assetTag: doc.tag,
                        skuModel: doc.sku.map(function (mysku) { return mysku.name } ),
                        mfgName: doc.manufacturer.map(function (mymfg) { return mymfg.name } ),
                        locName: doc.location.map(function (myloc) { return myloc.name } ),
                        groupName: doc.group.map(function (mygroup) { return mygroup.name } ),
                        assetStatus: doc.healthStatus.map(function (myhstat) { return myhstat.name } ),
                        resStatus: 'Not Available'
                    });
                });
                renderAssetHome(req, res, assetList);
            } else {
                renderAssetHome(req, res, data);
            }
        }
    );
};

/* GET asset info page */
assetInfo = function (req, res) {
    var
        requestOptions, path;

    path = "/api/assets/" + req.params.assetId;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var
                doc = body,
                assetInfo = [];

            //console.log(doc);
            if ( response.statusCode === 200 ) {
                assetInfo = {
                    _id: doc._id,
                    hostname: doc.hostname,
                    assetTag: doc.tag,
                    skuModel: doc.sku.map(function (mysku) { return mysku.name } ),
                    mfgName: doc.manufacturer.map(function (mymfg) { return mymfg.name } ),
                    locName: doc.location.map(function (myloc) { return myloc.name } ),
                    groupName: doc.group.map(function (mygroup) { return mygroup.name } ),
                    assetStatus: doc.healthStatus.map(function (myhstat) { return myhstat.name } ),
                    resStatus: 'Not Available'
                };
                renderAssetInfo(req, res, assetInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addAsset = function (req, res) {
    var
        skuList = [],
        mfgList = [],
        locList = [],
        groupList = [],
        hStatList = [];

    async.parallel([
        function (callback) {
            var requestOptions, path;
            path = '/api/skus';
            requestOptions = {
                url    : apiOptions.server + path,
                method : "GET",
                json   : {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    if (response.statusCode === 200 && body.length) {
                        body.forEach(function (doc) {
                            skuList.push({
                                _id   : doc._id,
                                name  : doc.name
                            });
                        });
                        callback();
                    } else {
                        return callback(err);
                    }
                }
            )
        },
        function (callback) {
            var requestOptions, path;
            path = '/api/manufacturers';
            requestOptions = {
                url    : apiOptions.server + path,
                method : "GET",
                json   : {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    if (response.statusCode === 200 && body.length) {
                        body.forEach(function (doc) {
                            mfgList.push({
                                _id   : doc._id,
                                name  : doc.name
                            });
                        });
                        callback();
                    } else {
                        return callback(err);
                    }
                }
            )
        },
        function (callback) {
            var requestOptions, path;
            path = '/api/locations';
            requestOptions = {
                url    : apiOptions.server + path,
                method : "GET",
                json   : {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    if (response.statusCode === 200 && body.length) {
                        body.forEach(function (doc) {
                            locList.push({
                                _id: doc._id,
                                name: doc.name
                            });
                        });
                        callback();
                    } else {
                        return callback(err);
                    }
                }
            )
        },
        function (callback) {
            var requestOptions, path;
            path = '/api/groups';
            requestOptions = {
                url    : apiOptions.server + path,
                method : "GET",
                json   : {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    if (response.statusCode === 200 && body.length) {
                        body.forEach(function (doc) {
                            groupList.push({
                                _id: doc._id,
                                name: doc.name
                            });
                        });
                        callback();
                    } else {
                        return callback(err);
                    }
                }
            )
        },
        function (callback) {
            var requestOptions, path;
            path = '/api/hStatus';
            requestOptions = {
                url    : apiOptions.server + path,
                method : "GET",
                json   : {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    if (response.statusCode === 200 && body.length) {
                        body.forEach(function (doc) {
                            hStatList.push({
                                _id: doc._id,
                                name: doc.name
                            });
                        });
                        callback();
                    } else {
                        return callback(err);
                    }
                }
            )
        }
    ], function(err) {
        if (err) return next(err);
        renderAssetAddForm(req, res, skuList, mfgList, locList, groupList, hStatList);
    })
};

doAddAsset = function (req, res) {
    var
        requestOptions, path, postData;
    path = '/api/assets';
    postData = {
        tag: req.body.assetTag,
        hostname: req.body.hostName
    };
    requestOptions = {
        url    : apiOptions.server + path,
        method : "POST",
        json   : postData
    };
};

/* GET edit asset page */
assetEdit = function (req, res) {
    res.render('asset-edit', {
        title: 'Server1 - Edit Asset',
        pageHeader: {
            title: 'Edit Server1'
        }
    });
};

module.exports = {
    assetList : assetList,
    assetInfo : assetInfo,
    addAsset  : addAsset,
    assetEdit : assetEdit
};
//----------------  END PUBLIC METHODS  --------------