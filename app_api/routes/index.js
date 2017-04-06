/*
 * app_api/routes/index.js - Index for API routes
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
    express = require('express'),
    router = express.Router(),

    ctrlSkus = require('../controllers/skus'),
    ctrlMfgs = require('../controllers/manufacturers'),
    ctrlLocations = require('../controllers/locations'),
    ctrlGroups = require('../controllers/groups'),
    ctrlHealthStatus = require('../controllers/health'),
    ctrlAssets = require('../controllers/assets');
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN ROUTES CONFIGURATION --------------
// SKUs
router.get(    '/skus', ctrlSkus.skuList);
router.post(   '/skus', ctrlSkus.skuCreate);
router.get(    '/skus/:sku_id', ctrlSkus.skuReadOne);
router.put(    '/skus/:sku_id', ctrlSkus.skuUpdateOne);
router.delete( '/skus/:sku_id', ctrlSkus.skuDeleteOne);

// Manufacturers
router.get(    '/manufacturers', ctrlMfgs.mfgList);
router.post(   '/manufacturers', ctrlMfgs.mfgCreate);
router.get(    '/manufacturers/:manufacturer_id', ctrlMfgs.mfgReadOne);
router.put(    '/manufacturers/:manufacturer_id', ctrlMfgs.mfgUpdateOne);
router.delete( '/manufacturers/:manufacturer_id', ctrlMfgs.mfgDeleteOne);

// Locations
router.get(    '/locations', ctrlLocations.locationList);
router.post(   '/locations', ctrlLocations.locationCreate);
router.get(    '/locations/:location_id', ctrlLocations.locationReadOne);
router.put(    '/locations/:location_id', ctrlLocations.locationUpdateOne);
router.delete( '/locations/:location_id', ctrlLocations.locationDeleteOne);

// Groups
router.get('/groups', ctrlGroups.groupList);
router.get('/groups/:group_id', ctrlGroups.groupReadOne);

// Health Status
router.get('/hStatus', ctrlHealthStatus.statList);
router.get('/hStatus/:hstat_id', ctrlHealthStatus.statReadOne);

// Assets
router.get(    '/assets',           ctrlAssets.assetList      );
router.post(   '/assets',           ctrlAssets.assetCreate    );
router.get(    '/assets/:asset_id', ctrlAssets.assetReadOne   );
router.put(    '/assets/:asset_id', ctrlAssets.assetUpdateOne );
router.delete( '/assets/:asset_id', ctrlAssets.assetDeleteOne );

//----------------  END ROUTES CONFIGURATION  --------------

//---------------- MODULE EXPORTS --------------
module.exports = router;