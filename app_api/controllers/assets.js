/*
 * app_api/controllers/assets.js - Controller for assets API
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
    Asset = mongoose.model('Asset'),

    sendJsonResponse,
    assetList, assetReadOne, assetCreate, assetUpdateOne, assetDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
assetList = function (req, res) {
    Asset
        .find()
        .exec(function (err, assets) {
            if (!assets) {
                sendJsonResponse(res, 404, {
                    "message": "No assets found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(assets);
            sendJsonResponse(res, 200, assets);
        });
};

assetReadOne = function (req, res) {
    if (req.params && req.params.asset_id) {
        Asset
            .findById(req.params.asset_id)
            .exec(function (err, asset) {
                if (!asset) {
                    sendJsonResponse(res, 404, {
                        "message": "Asset not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err); // Status code 404 -> not found
                    return;
                }
                console.log(asset);
                sendJsonResponse(res, 200, asset);
            });
    } else {
        console.log('No asset_id specified');
        sendJsonResponse(res, 404, {
            "message": "No asset_id in request"
        });
    }
};

assetCreate = function (req, res) {
    // Uniqueness for <name> is insured in the model
    Asset.create({
        tag: req.body.tag,
        hostname: req.body.hostname,
        sku: [{
            id: req.body.sku_id,
            name: req.body.sku_name
        }],
        hwModel: [{
            id: req.body.hwmodel_id,
            name: req.body.hwmodel_name
        }],
        manufacturer: [{
            id: req.body.mfg_id,
            name: req.body.mfg_name
        }],
        location: [{
            id: req.body.location_id,
            name: req.body.location_name
        }],
        group: [{
            id: req.body.group_id,
            name: req.body.group_name
        }],
        healthStatus: [{
            id: req.body.hstat_id,
            name: req.body.hstat_name
        }]
    }, function (err, asset) {
        if (err) {
            sendJsonResponse(res, 400, err); // Status code 400 -> bad request
        } else {
            sendJsonResponse(res, 201, asset); // Status code 201 -> resource created
        }
    });
};

assetUpdateOne = function (req, res) {
    if (!req.params.asset_id) {
        sendJsonResponse(res, 404, {
            "message": "No asset_id"
        });
        return;
    }
    Asset
        .findById(req.params.asset_id)
        .exec(
            function (err, asset) {
                if (!asset) {
                    sendJsonResponse(res, 404, {
                        "message": "Asset not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                asset.tag = req.body.tag;
                asset.hostname = req.body.hostname;
                asset.sku = [{
                    id: req.body.sku_id,
                    name: req.body.sku_name
                }];
                asset.hwModel = [{
                    id: req.body.hwmodel_id,
                    name: req.body.hwmodel_name
                }];
                asset.manufacturer = [{
                    id: req.body.mfg_id,
                    name: req.body.mfg_name
                }];
                asset.location = [{
                    id: req.body.location_id,
                    name: req.body.location_name
                }];
                asset.group = [{
                    id: req.body.group_id,
                    name: req.body.group_name
                }];
                asset.healthStatus = [{
                    id: req.body.hstat_id,
                    name: req.body.hstat_name
                }];

                // We do not update the "reserved" and "res_id" fields
                // this way, the reservation API is the only one updating
                // these fields

                asset.save(function (err, asset) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, asset);
                    }
                });
            }
        );
};

assetDeleteOne = function (req, res) {
    var asset_id = req.params.asset_id;
    if (asset_id) {
        Asset
            .findByIdAndRemove(asset_id)
            .exec(
                function (err, asset) {
                    if (err) {
                        sendJsonResponse(res, 404, err); // Status code 404 -> not found
                        return;
                    }
                    sendJsonResponse(res, 204, null); // Status code 204 -> no content
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No asset_id"
        });
    }
};

module.exports = {
    assetList      : assetList,
    assetReadOne   : assetReadOne,
    assetCreate    : assetCreate,
    assetUpdateOne : assetUpdateOne,
    assetDeleteOne : assetDeleteOne
};
//----------------  END PUBLIC METHODS  --------------