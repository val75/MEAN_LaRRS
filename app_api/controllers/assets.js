var mongoose = require('mongoose');
var Asset = mongoose.model('Asset');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.assetList = function (req, res) {
    sendJsonResponse(res, 200, { "status" : "Success" } );
};

module.exports.assetCreate = function (req, res) {
    sendJsonResponse(res, 200, { "status" : "Success" } );
};

module.exports.assetReadOne = function (req, res) {
    if (req.params && req.params.asset_id) {
        Asset
            .findById(req.params.asset_id)
            .exec(function (err, asset) {
                if (!asset) {
                    sendJsonResponse(res, 404, {
                        "message": "Asset not found"
                    });
                    return
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
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

module.exports.assetUpdateOne = function (req, res) {

};

module.exports.assetDeleteOne = function (req, res) {

};