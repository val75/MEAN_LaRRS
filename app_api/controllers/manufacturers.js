/*
 * app_api/controllers/manufacturers.js - Controller for manufacturers API
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
    Manufacturer = mongoose.model('Manufacturer'),

    sendJsonResponse, mfgList, mfgReadOne, mfgCreate, mfgUpdateOne, mfgDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
mfgList = function (req, res) {
    Manufacturer
        .find()
        .exec(function (err, manufacturers) {
            if (!manufacturers) {
                sendJsonResponse(res, 404, {
                    "message": "No manufacturers found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(manufacturers);
            sendJsonResponse(res, 200, manufacturers)
        });
};

mfgReadOne = function (req, res) {
    if (req.params && req.params.manufacturer_id) {
        Manufacturer
            .findById(req.params.manufacturer_id)
            .exec(function (err, manufacturer) {
                if (!manufacturer) {
                    sendJsonResponse(res, 404, {
                        "message": "Manufacturer not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(manufacturer);
                sendJsonResponse(res, 200, manufacturer);
            });
    } else {
        console.log('No manufacturer_id specified');
        sendJsonResponse(res, 404, {
            "message": "No manufacturer_id in request"
        });
    }
};

mfgCreate = function (req, res) {
    if (req.payload.username === "admin") {
        console.log("Admin is creating a new manufacturer...");
        // Uniqueness for <name> is insured in the model
        Manufacturer.create({
            name: req.body.name,
            notes: req.body.notes
        }, function (err, manufacturer) {
            if (err) {
                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
            } else {
                sendJsonResponse(res, 201, manufacturer); // Status code 201 -> resource created
            }
        });
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can create a new manufacturer"
        })
    }
};

mfgUpdateOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (!req.params.manufacturer_id) {
            sendJsonResponse(res, 404, {
                "message": "No manufacturer_id"
            });
            return;
        }
        Manufacturer
            .findById(req.params.manufacturer_id)
            .exec(
                function (err, manufacturer) {
                    if (!manufacturer) {
                        sendJsonResponse(res, 404, {
                            "message": "Manufacturer not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    manufacturer.name = req.body.name;
                    manufacturer.notes = req.body.notes;

                    manufacturer.save(function (err, manufacturer) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, manufacturer);
                        }
                    });
                }
            );
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can modify an existing manufacturer"
        })
    }
};

mfgDeleteOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (req.params.manufacturer_id) {
            Manufacturer
                .findByIdAndRemove(req.params.manufacturer_id)
                .exec(
                    function (err, manufacturer) {
                        if (err) {
                            sendJsonResponse(res, 404, err); // Status code 404 -> not found
                            return;
                        }
                        sendJsonResponse(res, 204, null); // Status code 204 -> no content
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "No manufacturer_id"
            });
        }
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can delete an existing manufacturer"
        })
    }
};

module.exports = {
    mfgList      : mfgList,
    mfgReadOne   : mfgReadOne,
    mfgCreate    : mfgCreate,
    mfgUpdateOne : mfgUpdateOne,
    mfgDeleteOne : mfgDeleteOne
};
//----------------  END PUBLIC METHODS  --------------