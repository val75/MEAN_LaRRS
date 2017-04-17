var request = require('request');

var apiOptions = {
    server : "http://localhost:3000"
};

var _showError = function (req, res, status) {
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

var renderAssetHome = function (req, res, responseBody) {
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

var renderAssetInfo = function (req, res, assetDetail) {
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

/* GET assets list page */
module.exports.assetList = function (req, res) {
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
module.exports.assetInfo = function (req, res) {
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

/* GET edit asset page */
module.exports.assetEdit = function (req, res) {
    res.render('asset-edit', {
        title: 'Server1 - Edit Asset',
        pageHeader: {
            title: 'Edit Server1'
        }
    });
};