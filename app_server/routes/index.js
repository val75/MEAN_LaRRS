var express = require('express');
var router = express.Router();
var ctrlAssets = require('../controllers/assets');
var ctrlAdmin = require('../controllers/admin');
var ctrlApiHelp = require('../controllers/api_help');

/* Assets pages */
router.get('/', ctrlAssets.assetList);
router.get('/assets/:assetId', ctrlAssets.assetInfo);
router.get('/asset-edit', ctrlAssets.assetEdit);

/* Admin pages */
router.get('/admin', ctrlAdmin.taskList);

router.get('/admin/skus', ctrlAdmin.skuList);
router.get('/admin/mfg', ctrlAdmin.manufacturerList);
router.get('/admin/locations', ctrlAdmin.locationList);
router.get('/admin/groups', ctrlAdmin.groupList);
router.get('/admin/hstats', ctrlAdmin.hstatList);

/* API Help page */
router.get('/api_help', ctrlApiHelp.show);

module.exports = router;
