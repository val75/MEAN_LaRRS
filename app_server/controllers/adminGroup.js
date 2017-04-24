/*
 * app_server/controllers/adminGroup.js - Server controller for group admin
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

    _showError, renderGroupList, renderGroupAddForm, renderGroupInfo,
    groupList, groupInfo, addGroup, doAddGroup, deleteGroup;
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

renderGroupList = function (req, res, responseBody) {
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
        title      : 'Groups',
        pageHeader : {
            title     : 'Groups',
            strapline : 'List of defined asset groups'
        },
        items   : responseBody,
        type    : 'groups',
        message : message
    });
};

renderGroupAddForm = function (req, res) {
    res.render('item-add-form', {
        title      : 'Add Group',
        pageHeader : {
            title     : 'Add Group',
            strapline : 'Define new asset group'
        },
        type        : 'groups',
        itemCapName : "Group"
    });
};

renderGroupInfo = function (req, res, itemDetail) {
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
groupList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/groups';
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
                groupList  = [];
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    groupList.push({
                        _id   : doc._id,
                        type  : 'groups',
                        name  : doc.name,
                        notes : doc.notes
                    });
                });
                renderGroupList(req, res, groupList);
            } else {
                renderGroupList(req, res, data);
            }
        }
    );
};

groupInfo = function (req, res) {
    var
        requestOptions, path;

    path = '/api/groups/' + req.params.group_id;
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
                renderGroupInfo(req, res, itemInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addGroup = function (req, res) {
    renderGroupAddForm(req, res);
};

doAddGroup = function (req, res) {
    var
        requestOptions, path, postData;

    path     = '/api/groups';
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
                res.redirect('/admin/groups');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

deleteGroup = function (req, res) {
    var
        requestOptions, path, groupId;

    groupId = req.params.group_id;
    path  = '/api/groups/' + groupId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/admin/groups');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    groupList   : groupList,
    groupInfo   : groupInfo,
    addGroup    : addGroup,
    doAddGroup  : doAddGroup,
    deleteGroup : deleteGroup
};
//----------------  END PUBLIC METHODS  --------------