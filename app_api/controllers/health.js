/*
 * app_api/controllers/health.js - Controller for health status API
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
    HealthStat = mongoose.model('HealthStat'),

    sendJsonResponse, statList, statReadOne, statCreate, statUpdateOne, statDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
statList = function (req, res) {
    HealthStat
        .find()
        .exec(function (err, hstats) {
            if (!hstats) {
                sendJsonResponse(res, 404, {
                    "message": "No health stats found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(hstats);
            sendJsonResponse(res, 200, hstats);
        });
};

statReadOne = function (req, res) {
    if (req.params && req.params.hstat_id) {
        HealthStat
            .findById(req.params.hstat_id)
            .exec(function (err, hstat) {
                if (!hstat) {
                    sendJsonResponse(res, 404, {
                        "message": "Health Status not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(hstat);
                sendJsonResponse(res, 200, hstat);
            });
    } else {
        console.log('No hstat_id specified');
        sendJsonResponse(res, 404, {
            "message": "No hstat_id in request"
        });
    }
};

statCreate = function (req, res) {
    if (req.payload.username === "admin") {
        console.log("Admin is creating a new health status...");
        // Uniqueness for <name> is insured in the model
        HealthStat.create({
            name: req.body.name,
            notes: req.body.notes
        }, function (err, hstat) {
            if (err) {
                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
            } else {
                sendJsonResponse(res, 201, hstat); // Status code 201 -> resource created
            }
        });
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can create a new health status"
        })
    }
};

statUpdateOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (!req.params.hstat_id) {
            sendJsonResponse(res, 404, {
                "message": "No hstat_id"
            });
            return;
        }
        HealthStat
            .findById(req.params.hstat_id)
            .exec(
                function (err, hstat) {
                    if (!hstat) {
                        sendJsonResponse(res, 404, {
                            "message": "Health status not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    hstat.name = req.body.name;
                    hstat.notes = req.body.notes;

                    hstat.save(function (err, hstat) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, hstat);
                        }
                    });
                }
            );
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can modify an existing health status"
        })
    }
};

statDeleteOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (req.params.hstat_id) {
            HealthStat
                .findByIdAndRemove(req.params.hstat_id)
                .exec(
                    function (err, hstat) {
                        if (err) {
                            sendJsonResponse(res, 404, err); // Status code 404 -> not found
                            return;
                        }
                        sendJsonResponse(res, 204, null); // Status code 204 -> no content
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "No hstat_id"
            });
        }
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can delete an existing health status"
        })
    }
};

module.exports = {
    statList      : statList,
    statReadOne   : statReadOne,
    statCreate    : statCreate,
    statUpdateOne : statUpdateOne,
    statDeleteOne : statDeleteOne
};
//----------------  END PUBLIC METHODS  --------------