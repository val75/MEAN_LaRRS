/*
 * app_server/controllers/adminSku.js - Server controller for SKU admin
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
    request    = require('request'),
    apiOptions = {
        server : "http://localhost:3000"
    },

    _showError, renderSkuList, renderSkuAddForm, renderSkuInfo,
    skuList, skuInfo, addSku, doAddSku, deleteSku;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
_showError = function (req, res, status) {
    var title, content;

    if (status === 404) {
        title   = "404, page not found";
        content = "Looks like we can't find this page, sorry!";
    } else {
        title   = status + ", something's gone wrong";
        content = "Something, somewhere, has just gone a little wrong";
    }

    res.status(status);
    res.render('generic-text', {
        title   : title,
        content : content
    });
};

renderSkuList = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "Nothing found here";
        }
    }
    res.render('item-admin', {
        title      : 'SKUs',
        pageHeader : {
            title     : 'SKUs',
            strapline : 'List of defined SKUs'
        },
        items   : responseBody,
        type    : 'skus',
        message : message
    });
};

renderSkuAddForm = function (req, res) {
    res.render('item-add-form', {
        title      : 'Add SKU',
        pageHeader : {
            title     : 'Add SKU',
            strapline : 'Define new SKU'
        },
        type        : 'skus',
        itemCapName : "SKU"
    });
};

renderSkuInfo = function (req, res, itemDetail) {
    res.render('item-info', {
        title : itemDetail.name,
        pageHeader : {
            title : itemDetail.name
        },
        item: {
            name: itemDetail.name,
            notes: itemDetail.notes
        }
    });
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
skuList = function (req, res) {
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
                data,
                skuList  = [];
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    skuList.push({
                        _id   : doc._id,
                        type  : 'skus',
                        name  : doc.name,
                        notes : doc.notes
                    });
                });
                renderSkuList(req, res, skuList);
            } else {
                renderSkuList(req, res, data);
            }
        }
    );
};

skuInfo = function (req, res) {
    console.log('here for some reason');
    var
        requestOptions, path;

    path = '/api/skus/' + req.params.sku_id;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "GET",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                doc = body,
                itemInfo = [];

            if (response.statusCode === 200) {
                itemInfo = {
                    _id: doc._id,
                    name: doc.name,
                    notes: doc.notes
                };
                renderSkuInfo(req, res, itemInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addSku = function (req, res) {
    console.log('---------Got here');
    renderSkuAddForm(req, res);
};

doAddSku = function (req, res) {
    var
        requestOptions, path, postData;

    path     = '/api/skus';
    postData = {
        name  : req.body.itemName,
        notes : req.body.itemNotes
    };
    requestOptions = {
        url    : apiOptions.server + path,
        method : "POST",
        json   : postData
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/admin/skus');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

deleteSku = function (req, res) {
    var
        requestOptions, path, skuId;

    skuId = req.params.sku_id;
    path  = '/api/skus/' + skuId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/admin/skus');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    skuList   : skuList,
    skuInfo   : skuInfo,
    addSku    : addSku,
    doAddSku  : doAddSku,
    deleteSku : deleteSku
};
//----------------  END PUBLIC METHODS  --------------