/*
 * app_server/controllers/adminSku.js - Server controller for manufacturers admin
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

    _showError, renderMfgList, renderMfgAddForm, renderMfgInfo,
    mfgList, mfgInfo, addMfg, doAddMfg, deleteMfg;
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

renderMfgList = function (req, res, responseBody) {
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
        title      : 'Manufacturers',
        pageHeader : {
            title     : 'Manufacturers',
            strapline : 'List of defined Manufacturers'
        },
        items   : responseBody,
        type    : 'mfgs',
        message : message
    });
};

renderMfgAddForm = function (req, res) {
    res.render('item-add-form', {
        title       : 'Add Manufacturer',
        pageHeader  : {
            title     : 'Add Manufacturer',
            strapline : 'Define new manufacturer'
        },
        type        : 'mfgs',
        itemCapName : "Manufacturer"
    });
};

renderMfgInfo = function (req, res, itemDetail) {
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
mfgList = function (req, res) {
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
                data,
                mfgList  = [];
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    mfgList.push({
                        _id   : doc._id,
                        type  : 'mfgs',
                        name  : doc.name,
                        notes : doc.notes
                    });
                });
                renderMfgList(req, res, mfgList);
            } else {
                renderMfgList(req, res, data);
            }
        }
    );
};

mfgInfo = function (req, res) {
    var
        requestOptions, path;

    path = '/api/manufacturers/' + req.params.mfg_id;
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
                renderMfgInfo(req, res, itemInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addMfg = function (req, res) {
    renderMfgAddForm(req, res);
};

doAddMfg = function (req, res) {
    var
        requestOptions, path, postData;

    path     = '/api/manufacturers';
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
                res.redirect('/admin/mfgs');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

deleteMfg = function (req, res) {
    var
        requestOptions, path, mfgId;

    mfgId = req.params.mfg_id;
    path  = '/api/manufacturers/' + mfgId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/admin/mfgs');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    mfgList   : mfgList,
    mfgInfo   : mfgInfo,
    addMfg    : addMfg,
    doAddMfg  : doAddMfg,
    deleteMfg : deleteMfg
};
//----------------  END PUBLIC METHODS  --------------