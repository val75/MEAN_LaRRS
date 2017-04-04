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

    sendJsonResponse, mfgList, mfgReadOne;
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

module.exports = {
    mfgList    : mfgList,
    mfgReadOne : mfgReadOne
};
//----------------  END PUBLIC METHODS  --------------