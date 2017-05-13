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

    sendJsonResponse,
    reservationList, reservationReadOne,
    reservationCreate, reservationUpdateOne, reservationDeleteOne, reservationDeleteUpdate;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
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
    var
        assetId = req.body.asset_id;

    Asset
        .findById(assetId)
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
                    //sendJsonResponse(res, 200, asset);

                    Reservation.create({
                        assetId: assetId,
                        user: req.body.user,
                        notes: req.body.notes
                    }, function (err, reservation) {
                        if (err) {
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
        });
};

reservationUpdateOne = function (req, res) {
    if (!req.params.reservation_id) {
        sendJsonResponse(res, 404, {
            "message": "No reservation_id"
        });
        return;
    }
    Reservation
        .findById(req.params.reservation_id)
        .exec(
            function (err, reservation) {
                if (!reservation) {
                    sendJsonResponse(res, 404, {
                        "message": "Reservation not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                reservation.end_time = req.body.end_time;
                reservation.notes = req.body.notes;

                reservation.save(function (err, reservation) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, reservation);
                    }
                });
            }
        );
};

reservationDeleteUpdate = function (req, res) {
    var
        reservation_id, asset_id;

    reservation_id = req.params.reservation_id;
    
    if (reservation_id) {
        Reservation
            .findById(reservation_id)
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
                asset_id = reservation.assetId;

                Asset
                    .findById(asset_id)
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
};

reservationDeleteOne = function (req, res) {
    var reservation_id = req.params.reservation_id;
    if (reservation_id) {
        Reservation
            .findByIdAndRemove(reservation_id)
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
        sendJsonResponse(res, 404, {
            "message": "No reservation_id"
        });
    }
};

module.exports = {
    reservationList      : reservationList,
    reservationReadOne   : reservationReadOne,
    reservationCreate    : reservationCreate,
    reservationUpdateOne : reservationUpdateOne,
    reservationDeleteUpdate : reservationDeleteUpdate,
    reservationDeleteOne : reservationDeleteOne
};

//----------------  END PUBLIC METHODS  --------------