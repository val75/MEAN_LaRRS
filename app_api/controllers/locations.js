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

    sendJsonResponse, locationList, locationReadOne, locationCreate, locationUpdateOne, locationDeleteOne;
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
        .find(req.query)
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

locationCreate = function (req, res) {
    if (req.payload.username === "admin") {
        console.log("Admin is creating a new location...");
        // Uniqueness for <name> is insured in the model
        Location.create({
            name: req.body.name,
            type: req.body.type,
            parent_id: req.body.parent_id,
            parent_name: req.body.parent_name,
            ancestors: req.body.ancestors,
            notes: req.body.notes
        }, function (err, location) {
            if (err) {
                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
            } else {
                sendJsonResponse(res, 201, location); // Status code 201 -> resource created
            }
        });
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can create a new location"
        })
    }
};

locationUpdateOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (!req.params.location_id) {
            sendJsonResponse(res, 404, {
                "message": "No location_id"
            });
            return;
        }
        Location
            .findById(req.params.location_id)
            .exec(
                function (err, location) {
                    if (!location) {
                        sendJsonResponse(res, 404, {
                            "message": "Location not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    location.name = req.body.name;
                    location.notes = req.body.notes;

                    location.save(function (err, location) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, location);
                        }
                    });
                }
            );
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can modify an existing location"
        })
    }
};

locationDeleteOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (req.params.location_id) {
            Location
                .findByIdAndRemove(req.params.location_id)
                .exec(
                    function (err, location) {
                        if (err) {
                            sendJsonResponse(res, 404, err); // Status code 404 -> not found
                            return;
                        }
                        sendJsonResponse(res, 204, null); // Status code 204 -> no content
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "No location_id"
            });
        }
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can delete an existing location"
        })
    }
};

module.exports = {
    locationList      : locationList,
    locationReadOne   : locationReadOne,
    locationCreate    : locationCreate,
    locationUpdateOne : locationUpdateOne,
    locationDeleteOne : locationDeleteOne
};
//----------------  END PUBLIC METHODS  --------------