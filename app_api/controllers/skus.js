/*
 * app_api/controllers/sku.js - Controller for SKU API
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

    sendJsonResponse, skuList, skuReadOne;
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
                    sendJsonResponse(res, 404, err);
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

module.exports = {
    skuList    : skuList,
    skuReadOne : skuReadOne
};
//----------------  END PUBLIC METHODS  --------------