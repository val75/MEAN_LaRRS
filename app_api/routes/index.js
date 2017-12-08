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
    router  = express.Router(),
    jwt     = require('express-jwt'),
    auth    = jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
    }),

    ctrlSkus         = require('../controllers/skus'),
    ctrlMfgs         = require('../controllers/manufacturers'),
    ctrlLocations    = require('../controllers/locations'),
    ctrlGroups       = require('../controllers/groups'),
    ctrlHealthStatus = require('../controllers/health'),
    ctrlHwModels     = require('../controllers/hw_model'),
    ctrlAssets       = require('../controllers/assets'),
    ctrlReservations = require('../controllers/reservations'),
    ctrlUsers        = require('../controllers/users'),
    ctrlAuth         = require('../controllers/authentication');
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN ROUTES CONFIGURATION --------------
// SKUs
router.get(    '/skus',               ctrlSkus.skuList      );
router.get(    '/skus/:sku_id',       ctrlSkus.skuReadOne   );
router.post(   '/skus',         auth, ctrlSkus.skuCreate    );
router.put(    '/skus/:sku_id', auth, ctrlSkus.skuUpdateOne );
router.delete( '/skus/:sku_id', auth, ctrlSkus.skuDeleteOne );

// Manufacturers
router.get(    '/manufacturers',                        ctrlMfgs.mfgList      );
router.get(    '/manufacturers/:manufacturer_id',       ctrlMfgs.mfgReadOne   );
router.post(   '/manufacturers',                  auth, ctrlMfgs.mfgCreate    );
router.put(    '/manufacturers/:manufacturer_id', auth, ctrlMfgs.mfgUpdateOne );
router.delete( '/manufacturers/:manufacturer_id', auth, ctrlMfgs.mfgDeleteOne );

// Locations
router.get(    '/locations',                    ctrlLocations.locationList      );
router.get(    '/locations/:location_id',       ctrlLocations.locationReadOne   );
router.post(   '/locations',              auth, ctrlLocations.locationCreate    );
router.put(    '/locations/:location_id', auth, ctrlLocations.locationUpdateOne );
router.delete( '/locations/:location_id', auth, ctrlLocations.locationDeleteOne );

// Groups
router.get(    '/groups',                 ctrlGroups.groupList      );
router.get(    '/groups/:group_id',       ctrlGroups.groupReadOne   );
router.post(   '/groups',           auth, ctrlGroups.groupCreate    );
router.put(    '/groups/:group_id', auth, ctrlGroups.groupUpdateOne );
router.delete( '/groups/:group_id', auth, ctrlGroups.groupDeleteOne );

// Health Status
router.get(    '/hStatus',                 ctrlHealthStatus.statList      );
router.get(    '/hStatus/:hstat_id',       ctrlHealthStatus.statReadOne   );
router.post(   '/hStatus',           auth, ctrlHealthStatus.statCreate    );
router.put(    '/hStatus/:hstat_id', auth, ctrlHealthStatus.statUpdateOne );
router.delete( '/hStatus/:hstat_id', auth, ctrlHealthStatus.statDeleteOne );

// Hardware Model
router.get(    '/hwmodels',                   ctrlHwModels.hwModelList      );
router.get(    '/hwmodels/:hwmodel_id',       ctrlHwModels.hwModelReadOne   );
router.post(   '/hwmodels',             auth, ctrlHwModels.hwModelCreate    );
router.put(    '/hwmodels/:hwmodel_id', auth, ctrlHwModels.hwModelUpdateOne );
router.delete( '/hwmodels/:hwmodel_id', auth, ctrlHwModels.hwModelDeleteOne );

// Assets
router.get(    '/assets',                 ctrlAssets.assetList      );
router.get(    '/assets/:asset_id',       ctrlAssets.assetReadOne   );
router.post(   '/assets',           auth, ctrlAssets.assetCreate    );
router.put(    '/assets/:asset_id', auth, ctrlAssets.assetUpdateOne );
router.delete( '/assets/:asset_id', auth, ctrlAssets.assetDeleteOne );

// Reservations
router.get(    '/reservations',                       ctrlReservations.reservationList         );
router.get(    '/reservations/:reservation_id',       ctrlReservations.reservationReadOne      );
router.post(   '/reservations',                 auth, ctrlReservations.reservationCreate       );
router.delete( '/reservations/:reservation_id', auth, ctrlReservations.reservationDeleteUpdate );
//router.delete( '/reservations/:reservation_id', ctrlReservations.reservationDeleteOne);

// Users
router.get(    '/users',          ctrlUsers.userList      );
router.get(    '/users/:user_id', ctrlUsers.userReadOne   );
router.delete( '/users/:user_id', ctrlUsers.userDeleteOne );

// Authentication
router.post(   '/register', ctrlAuth.register );
router.post(   '/login',    ctrlAuth.login    );

//----------------  END ROUTES CONFIGURATION  --------------

//---------------- MODULE EXPORTS --------------
module.exports = router;