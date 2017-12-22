/*
 * app_api/controllers/hw_model.js - Controller for Hardware Model API
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
    HwModel = mongoose.model('HwModel'),

    sendJsonResponse, hwModelList, hwModelReadOne, hwModelCreate, hwModelUpdateOne, hwModelDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
hwModelList = function (req, res) {
    HwModel
        .find()
        .exec(function (err, hwmodels) {
            if (!hwmodels) {
                sendJsonResponse(res, 404, {
                    "message": "No hardware models found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(hwmodels);
            sendJsonResponse(res, 200, hwmodels);
        });
};

hwModelReadOne = function (req, res) {
    if (req.params && req.params.hwmodel_id) {
        HwModel
            .findById(req.params.hwmodel_id)
            .exec(function (err, hwmodel) {
                if (!hwmodel) {
                    sendJsonResponse(res, 404, {
                        "message": "Hardware model not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err); // Status code 404 -> not found
                    return;
                }
                console.log(hwmodel);
                sendJsonResponse(res, 200, hwmodel);
            });
    } else {
        console.log('No hwmodel_id specified');
        sendJsonResponse(res, 404, {
            "message": "No hwmodel_id in request"
        });
    }
};

hwModelCreate = function (req, res) {
    if (req.payload.username === "admin") {
        console.log("Admin is creating a new hardware model...");
        // Uniqueness for <name> is insured in the model
        HwModel.create({
            name: req.body.name,
            notes: req.body.notes
        }, function (err, hwmodel) {
            if (err) {
                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
            } else {
                sendJsonResponse(res, 201, hwmodel); // Status code 201 -> resource created
            }
        });
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can create a new hardware model"
        })
    }
};

hwModelUpdateOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (!req.params.hwmodel_id) {
            sendJsonResponse(res, 404, {
                "message": "No hwmodel_id"
            });
            return;
        }
        HwModel
            .findById(req.params.hwmodel_id)
            .exec(
                function (err, hwmodel) {
                    if (!hwmodel) {
                        sendJsonResponse(res, 404, {
                            "message": "Hardware model not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    hwmodel.name = req.body.name;
                    hwmodel.notes = req.body.notes;

                    hwmodel.save(function (err, hwmodel) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, hwmodel);
                        }
                    });
                }
            );
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can modify an existing hardware model"
        })
    }
};

hwModelDeleteOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (req.params.hwmodel_id) {
            HwModel
                .findByIdAndRemove(req.params.hwmodel_id)
                .exec(
                    function (err, hwmodel) {
                        if (err) {
                            sendJsonResponse(res, 404, err); // Status code 404 -> not found
                            return;
                        }
                        sendJsonResponse(res, 204, null); // Status code 204 -> no content
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "No hwmodel_id"
            });
        }
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can delete an existing SKU"
        })
    }
};

module.exports = {
    hwModelList      : hwModelList,
    hwModelReadOne   : hwModelReadOne,
    hwModelCreate    : hwModelCreate,
    hwModelUpdateOne : hwModelUpdateOne,
    hwModelDeleteOne : hwModelDeleteOne
};

//----------------  END PUBLIC METHODS  --------------