/*
 * app_server/controllers/adminLoc.js - Server controller for location admin
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
    _showError, renderLocationList, renderLocationAddForm, renderLocationInfo,
    locationList, locationInfo, addLocation, doAddLocation, deleteLocation;

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

renderLocationList = function (req, res, responseBody) {
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
        title      : 'Locations',
        pageHeader : {
            title     : 'Locations',
            strapline : 'List of defined locations'
        },
        items   : responseBody,
        type    : 'locations',
        message : message
    });
};

renderLocationAddForm = function (req, res) {
    res.render('item-add-form', {
        title      : 'Add Location',
        pageHeader : {
            title     : 'Add Location',
            strapline : 'Define new location'
        },
        type        : 'locations',
        itemCapName : "Location"
    });
};

renderLocationInfo = function (req, res, itemDetail) {
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
locationList = function (req, res) {
    var
        requestOptions, path;

    path = '/api/locations';
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
                locationList  = [];
            data = body;
            if (response.statusCode === 200 && data.length) {
                data.forEach(function (doc) {
                    locationList.push({
                        _id   : doc._id,
                        type  : 'locations',
                        name  : doc.name,
                        notes : doc.notes
                    });
                });
                renderLocationList(req, res, locationList);
            } else {
                renderLocationList(req, res, data);
            }
        }
    );
};

locationInfo = function (req, res) {
    var
        requestOptions, path;

    path = '/api/locations/' + req.params.location_id;
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
                renderLocationInfo(req, res, itemInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

addLocation = function (req, res) {
    renderLocationAddForm(req, res);
};

doAddLocation = function (req, res) {
    var
        requestOptions, path, postData;

    path     = '/api/locations';
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
                res.redirect('/admin/locations');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

deleteLocation = function (req, res) {
    var
        requestOptions, path, locationId;

    locationId = req.params.location_id;
    path  = '/api/locations/' + locationId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/admin/locations');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    locationList   : locationList,
    locationInfo   : locationInfo,
    addLocation    : addLocation,
    doAddLocation  : doAddLocation,
    deleteLocation : deleteLocation
};
//----------------  END PUBLIC METHODS  --------------