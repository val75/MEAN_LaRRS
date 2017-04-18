/*
 * app_server/controllers/admin.js - Controller for server admin
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
    apiOptions = {
        server : "http://localhost:3000"
    },

    taskList, renderItemList,

    skuList, manufacturerList, locationList, groupList, hstatList;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
renderItemList = function (req, res, itemType, itemStrapline, responseBody) {
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
        title: itemType,
        pageHeader: {
            title: itemType,
            strapline : itemStrapline
        },
        items: responseBody,
        message: message
    });
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
taskList = function (req, res) {
    res.render('index', { title: 'Admin Task List' });
};

skuList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/skus';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data,
                skuList  = [],
                itemType = 'SKUs',
                itemStrapline = 'List of defined SKUs';
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    skuList.push({
                        _id: doc._id,
                        type: 'skus',
                        name: doc.name,
                        notes: doc.notes
                    });
                });
                renderItemList(req, res, itemType, itemStrapline, skuList);
            } else {
                renderItemList(req, res, itemType, itemStrapline, data);
            }
        }
    );
};

manufacturerList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/manufacturers';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data,
                mfgList  = [],
                itemType = 'Manufacturers',
                itemStrapline = 'List of defined manufacturers';
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    //console.log(doc);
                    mfgList.push({
                        _id: doc._id,
                        type: 'manufacturers',
                        name: doc.name,
                        notes: doc.notes
                    });
                });
                renderItemList(req, res, itemType, itemStrapline, mfgList);
            } else {
                renderItemList(req, res, itemType, itemStrapline, data);
            }
        }
    );
};

locationList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/locations';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data,
                locList  = [],
                itemType = 'Locations',
                itemStrapline = 'List of defined locations';
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    //console.log(doc);
                    locList.push({
                        _id: doc._id,
                        type: 'locations',
                        name: doc.name,
                        notes: doc.notes
                    });
                });
                renderItemList(req, res, itemType, itemStrapline, locList);
            } else {
                renderItemList(req, res, itemType, itemStrapline, data);
            }
        }
    );
};

groupList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/groups';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data,
                groupList  = [],
                itemType = 'Groups',
                itemStrapline = 'List of defined groups';
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    //console.log(doc);
                    groupList.push({
                        _id: doc._id,
                        type: 'groups',
                        name: doc.name,
                        notes: doc.notes
                    });
                });
                renderItemList(req, res, itemType, itemStrapline, groupList);
            } else {
                renderItemList(req, res, itemType, itemStrapline, data);
            }
        }
    );
};

hstatList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/hStatus';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                data,
                hstatList  = [],
                itemType = 'Health Status',
                itemStrapline = 'List of defined health stats';
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    //console.log(doc);
                    hstatList.push({
                        _id: doc._id,
                        type: 'hStatus',
                        name: doc.name,
                        notes: doc.notes
                    });
                });
                renderItemList(req, res, itemType, itemStrapline, hstatList);
            } else {
                renderItemList(req, res, itemType, itemStrapline, data);
            }
        }
    );
};

module.exports = {
    taskList : taskList,
    skuList : skuList,
    manufacturerList : manufacturerList,
    locationList : locationList,
    groupList : groupList,
    hstatList : hstatList
};

//----------------  END PUBLIC METHODS  --------------
