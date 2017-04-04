/*
 * app_api/controllers/locations.js - Controller for Locations API
 */

/*jslint        node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

//---------------- BEGIN MODULE SCOPE VARIABLES --------------
'use strict';

var
    mongoose = require('mongoose'),
    Location = mongoose.model('Location'),

    sendJsonResponse, locationList, locationReadOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
locationList = function (req, res) {
    Location
        .find()
        .exec(function (err, locations) {
            if (!locations) {
                sendJsonResponse(res, 404, {
                    "message": "No locations found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(locations);
            sendJsonResponse(res, 200, locations);
        });
};

locationReadOne = function (req, res) {
    if (req.params && req.params.location_id) {
        Location
            .findById(req.params.location_id)
            .exec(function (err, location) {
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "Location not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(location);
                sendJsonResponse(res, 200, location);
            });
    } else {
        console.log('No location_id specified');
        sendJsonResponse(res, 404, {
            "message": "No location_id in request"
        });
    }
};

module.exports = {
    locationList    : locationList,
    locationReadOne : locationReadOne
};
//----------------  END PUBLIC METHODS  --------------