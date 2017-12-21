/*
 * app_api/controllers/skus.js - Controller for SKU API
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
    Sku = mongoose.model('Sku'),

    sendJsonResponse, skuList, skuReadOne, skuCreate, skuUpdateOne, skuDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
skuList = function (req, res) {
    Sku
        .find()
        .exec(function (err, skus) {
            if (!skus) {
                sendJsonResponse(res, 404, {
                    "message": "No SKUs found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(skus);
            sendJsonResponse(res, 200, skus);
        });
};

skuReadOne = function (req, res) {
    if (req.params && req.params.sku_id) {
        Sku
            .findById(req.params.sku_id)
            .exec(function (err, sku) {
                if (!sku) {
                    sendJsonResponse(res, 404, {
                        "message": "SKU not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err); // Status code 404 -> not found
                    return;
                }
                console.log(sku);
                sendJsonResponse(res, 200, sku);
            });
    } else {
        console.log('No sku_id specified');
        sendJsonResponse(res, 404, {
            "message": "No sku_id in request"
        });
    }
};

skuCreate = function (req, res) {
    if (req.payload.username === "admin") {
        console.log("Admin is creating a new SKU...");
        // Uniqueness for <name> is insured in the model
        Sku.create({
            name: req.body.name,
            notes: req.body.notes
        }, function (err, sku) {
            if (err) {
                sendJsonResponse(res, 400, err); // Status code 400 -> bad request
            } else {
                sendJsonResponse(res, 201, sku); // Status code 201 -> resource created
            }
        });
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can create a new SKU"
        })
    }
};

skuUpdateOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (!req.params.sku_id) {
            sendJsonResponse(res, 404, {
                "message": "No sku_id"
            });
            return;
        }
        Sku
            .findById(req.params.sku_id)
            .exec(
                function (err, sku) {
                    if (!sku) {
                        sendJsonResponse(res, 404, {
                            "message": "SKU not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    sku.name = req.body.name;
                    sku.notes = req.body.notes;

                    sku.save(function (err, sku) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, sku);
                        }
                    });
                }
            );
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can modify an existing SKU"
        })
    }
};

skuDeleteOne = function (req, res) {
    if (req.payload.username === "admin") {
        if (req.params.sku_id) {
            Sku
                .findByIdAndRemove(req.params.sku_id)
                .exec(
                    function (err, sku) {
                        if (err) {
                            sendJsonResponse(res, 404, err); // Status code 404 -> not found
                            return;
                        }
                        sendJsonResponse(res, 204, null); // Status code 204 -> no content
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "No sku_id"
            });
        }
    } else {
        sendJsonResponse(res, 401, {
            "message": "Only admin user can delete an existing SKU"
        })
    }

};

module.exports = {
    skuList      : skuList,
    skuReadOne   : skuReadOne,
    skuCreate    : skuCreate,
    skuUpdateOne : skuUpdateOne,
    skuDeleteOne : skuDeleteOne
};
//----------------  END PUBLIC METHODS  --------------