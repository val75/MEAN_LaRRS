/*
 * app_server/controllers/adminHwModel.js - Server controller for hardware model admin
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

    _showError, renderHwModelList, renderHwModelAddForm, renderHwModelInfo,
    hwModelList, hwModelInfo, addHwModel, doAddHwModel, deleteHwModel;
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

renderHwModelList = function (req, res, responseBody) {
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
        title      : 'Hardware Models',
        pageHeader : {
            title     : 'Hardware Models',
            strapline : 'List of defined Hardware Models'
        },
        items   : responseBody,
        type    : 'hwmodels',
        message : message
    });
};

renderHwModelAddForm = function (req, res) {
    res.render('item-add-form', {
        title      : 'Add Hardware Model',
        pageHeader : {
            title     : 'Add Hardware Model',
            strapline : 'Define new Hardware Model'
        },
        type        : 'hwmodels',
        itemCapName : "HW Model"
    });
};

renderHwModelInfo = function (req, res, itemDetail) {
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

hwModelList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/hwmodels';
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
                hwModelList  = [];
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    hwModelList.push({
                        _id   : doc._id,
                        type  : 'hwmodels',
                        name  : doc.name,
                        notes : doc.notes
                    });
                });
                renderHwModelList(req, res, hwModelList);
            } else {
                renderHwModelList(req, res, data);
            }
        }
    );
};

hwModelInfo = function (req, res) {
    var
        requestOptions, path;

    path = '/api/hwmodels/' + req.params.hwmodel_id;
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
                renderHwModelInfo(req, res, itemInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addHwModel = function (req, res) {
    renderHwModelAddForm(req, res);
};

doAddHwModel = function (req, res) {
    var
        requestOptions, path, postData;

    path     = '/api/hwmodels';
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
                res.redirect('/admin/hwmodels');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

deleteHwModel = function (req, res) {
    var
        requestOptions, path, hwModelId;

    hwModelId = req.params.hwmodel_id;
    path  = '/api/hwmodels/' + hwModelId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/admin/hwmodels');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    hwModelList   : hwModelList,
    hwModelInfo   : hwModelInfo,
    addHwModel    : addHwModel,
    doAddHwModel  : doAddHwModel,
    deleteHwModel : deleteHwModel
};
//----------------  END PUBLIC METHODS  --------------