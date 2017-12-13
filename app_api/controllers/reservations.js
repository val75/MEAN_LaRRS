/*
 * app_api/controllers/reservations.js - Controller for reservations API
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
    Reservation = mongoose.model('Reservation'),
    Asset = mongoose.model('Asset'),
    User = mongoose.model('User'),

    sendJsonResponse, checkUser,
    reservationList, reservationReadOne,
    reservationCreate, reservationUpdateOne, reservationDeleteUpdate, reservationDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// Validates that the username in the req obect corresponds to an actual user in the DB, and sends that
// username to the callback function.
// Traps errors in the process and sends appropriate messages.
checkUser = function (req, res, callback) {
    console.log("Checking for user " + req.payload.username);

    if (req.payload.username) {
        User
            .findOne({ username : req.payload.username })
            .exec(function (err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "Specified username not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                // TODO: I don't think the user DB entry should be printed out here, it's a security hole
                //console.log(user);
                callback(req, res, user.username);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Username not specified in payload"
        });
    }
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
reservationList = function (req, res) {
    Reservation
        .find()
        .exec(function (err, reservations) {
            if (!reservations) {
                sendJsonResponse(res, 404, {
                    "message": "No reservations found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(reservations);
            sendJsonResponse(res, 200, reservations);
        });
};

reservationReadOne = function (req, res) {
    if (req.params && req.params.reservation_id) {
        Reservation
            .findById(req.params.reservation_id)
            .exec(function (err, reservation) {
                if (!reservation) {
                    sendJsonResponse(res, 404, {
                        "message": "Reservation not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err); // Status code 404 -> not found
                    return;
                }
                console.log(reservation);
                sendJsonResponse(res, 200, reservation);
            });
    } else {
        console.log('No reservation_id specified');
        sendJsonResponse(res, 404, {
            "message": "No reservation_id in request"
        });
    }
};

reservationCreate = function (req, res) {
    console.log("Reserving...");

    checkUser(req, res, function (req, res, username) {
        Asset
            .findById(req.body.asset_id)
            .exec(function (err, asset) {
                if (!asset) {
                    sendJsonResponse(res, 404, {
                        "message": "Asset not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 400, err); // Status code 400 -> bad request
                    return;
                }
                asset.reserved = true;

                asset.save(function (err, asset) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        Reservation.create({
                            assetId: req.body.asset_id,
                            user: username,
                            notes: req.body.notes
                        }, function (err, reservation) {
                            if (err) {
                                //TODO: if the Reservation.create fails here, we end up with asset.reserved = true anyway
                                //TODO: need to take care of that
                                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
                            } else {
                                //sendJsonResponse(res, 201, reservation); // Status code 201 -> resource created
                                asset.res_id = reservation._id;

                                asset.save(function (err, asset) {
                                    if (err) {
                                        sendJsonResponse(res, 404, err);
                                    } else {
                                        sendJsonResponse(res, 201, reservation);
                                    }
                                })
                            }
                        });
                    }
                })
            })
    })
};

reservationUpdateOne = function (req, res) {
    console.log("Updating reservation...");

    checkUser(req, res, function (req, res, username) {
        if (req.params.reservation_id) {
            Reservation
                .findById(req.params.reservation_id)
                .exec(function (err, reservation) {
                    if (!reservation) {
                        sendJsonResponse(res, 404, {
                            "message": "Reservation not found"
                        });
                        return;
                    } else if (err) {
                        console.log(err);
                        sendJsonResponse(res, 400, err);
                        return;
                    }

                    // We should only update reservation end time and/or notes
                    // We shouldn't update the asset_id or the user for a reservation
                    reservation.end_time = req.body.end_time;
                    reservation.notes = req.body.notes;

                    reservation.save(function (err, reservation) {
                        if (err) {
                            console.log(err);
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, reservation);
                        }
                    });
                })
        } else {
            console.log('No reservation_id specified');
            sendJsonResponse(res, 404, {
                "message": "No reservation_id in request"
            });
        }
    })
};

reservationDeleteUpdate = function (req, res) {
    console.log("Delete reservation and update asset...");

    checkUser(req, res, function (req, res, username) {
        if (req.params.reservation_id) {
            Reservation
                .findById(req.params.reservation_id)
                .exec(function (err, reservation) {
                    if (!reservation) {
                        sendJsonResponse(res, 404, {
                            "message": "Reservation not found"
                        });
                        return;
                    } else if (err) {
                        console.log(err);
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log(reservation);

                    Asset
                        .findById(reservation.assetId)
                        .exec(function (err, asset) {
                            if (!asset) {
                                sendJsonResponse(res, 404, {
                                    "message": "Asset not found"
                                });
                                return;
                            } else if (err) {
                                console.log(err);
                                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
                                return;
                            }
                            asset.reserved = false;
                            asset.res_id = undefined;

                            asset.save(function (err, asset) {
                                if (err) {
                                    sendJsonResponse(res, 404, err);
                                } else {
                                    reservation.remove(function (err, reservation) {
                                        if (err) {
                                            console.log(err);
                                            sendJsonResponse(res, 404, err)
                                        } else {
                                            sendJsonResponse(res, 204, null)
                                        }
                                    })
                                }
                            })
                        })
                })
        } else {
            console.log('No reservation_id specified');
            sendJsonResponse(res, 404, {
                "message": "No reservation_id in request"
            });
        }
    });
};

reservationDeleteOne = function (req, res) {
    console.log("Delete reservation without updating asset...");

    checkUser(req, res, function (req, res, username) {
        if (req.params.reservation_id) {
            Reservation
                .findByIdAndRemove(req.params.reservation_id)
                .exec(
                    function (err, reservation) {
                        if (err) {
                            sendJsonResponse(res, 404, err); // Status code 404 -> not found
                            return;
                        }
                        sendJsonResponse(res, 204, null); // Status code 204 -> no content
                    }
                );
        } else {
            console.log('No reservation_id specified');
            sendJsonResponse(res, 404, {
                "message": "No reservation_id in request"
            });
        }
    });
};

module.exports = {
    reservationList         : reservationList,
    reservationReadOne      : reservationReadOne,
    reservationCreate       : reservationCreate,
    reservationUpdateOne    : reservationUpdateOne,
    reservationDeleteUpdate : reservationDeleteUpdate,
    reservationDeleteOne    : reservationDeleteOne
};

//----------------  END PUBLIC METHODS  --------------