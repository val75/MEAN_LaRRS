/*
 * app_server/controllers/adminHStat.js - Server controller for health status admin
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

    _showError, renderHstatList, renderHstatAddForm, renderHstatInfo,
    hstatList, hstatInfo, addHStat, doAddHStat, deleteHStat;
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

renderHstatList = function (req, res, responseBody) {
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
        title      : 'Health Stats',
        pageHeader : {
            title     : 'Health Stats',
            strapline : 'List of defined health stats'
        },
        items   : responseBody,
        type    : 'hstats',
        message : message
    });
};

renderHstatAddForm = function (req, res) {
    res.render('item-add-form', {
        title      : 'Add health stat',
        pageHeader : {
            title     : 'Add health stat',
            strapline : 'Define new health status'
        },
        type        : 'hstats',
        itemCapName : "Health Status"
    });
};

renderHstatInfo = function (req, res, itemDetail) {
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
hstatList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/hStatus';
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
                hstatList  = [];
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    hstatList.push({
                        _id   : doc._id,
                        type  : 'hstats',
                        name  : doc.name,
                        notes : doc.notes
                    });
                });
                renderHstatList(req, res, hstatList);
            } else {
                renderHstatList(req, res, data);
            }
        }
    );
};

hstatInfo = function (req, res) {
    var
        requestOptions, path;

    path = '/api/hStatus/' + req.params.hstat_id;
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
                renderHstatInfo(req, res, itemInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addHStat = function (req, res) {
    renderHstatAddForm(req, res);
};

doAddHStat = function (req, res) {
    var
        requestOptions, path, postData;

    path     = '/api/hStatus';
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
                res.redirect('/admin/hstats');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

deleteHStat = function (req, res) {
    var
        requestOptions, path, hstatId;

    hstatId = req.params.hstat_id;
    path  = '/api/hStatus/' + hstatId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/admin/hstats');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    hstatList   : hstatList,
    hstatInfo   : hstatInfo,
    addHStat    : addHStat,
    doAddHStat  : doAddHStat,
    deleteHStat : deleteHStat
};
//----------------  END PUBLIC METHODS  --------------