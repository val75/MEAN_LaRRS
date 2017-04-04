var express = require('express');
var router = express.Router();

var ctrlSkus = require('../controllers/skus');
var ctrlAssets = require('../controllers/assets');

// SKUs
router.get('/skus', ctrlSkus.skuList);
router.get('/skus/:sku_id', ctrlSkus.skuReadOne);

// Assets
router.get(    '/assets',           ctrlAssets.assetList      );
router.post(   '/assets',           ctrlAssets.assetCreate    );
router.get(    '/assets/:asset_id', ctrlAssets.assetReadOne   );
router.put(    '/assets/:asset_id', ctrlAssets.assetUpdateOne );
router.delete( '/assets/:asset_id', ctrlAssets.assetDeleteOne );

module.exports = router;