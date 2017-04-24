var express = require('express');
var router = express.Router();
var ctrlAssets = require('../controllers/assets');
var ctrlAdmin = require('../controllers/admin');
var ctrlAdminSku = require('../controllers/adminSku');
var ctrlAdminMfg = require('../controllers/adminMfg');
var ctrlAdminLoc = require('../controllers/adminLoc');
var ctrlAdminGroup = require('../controllers/adminGroup');
var ctrlAdminHStat = require('../controllers/adminHStat');
var ctrlApiHelp = require('../controllers/api_help');

/* Assets pages */
router.get('/', ctrlAssets.assetList);
router.get('/assets/:assetId', ctrlAssets.assetInfo);
router.get('/asset-edit', ctrlAssets.assetEdit);

/* Admin pages */
router.get('/admin', ctrlAdmin.taskList);

/* SKU Admin */
router.get('/admin/skus', ctrlAdminSku.skuList);
router.get('/admin/skus/:sku_id', ctrlAdminSku.skuInfo);
router.get('/admin/skus/new', ctrlAdminSku.addSku);
router.post('/admin/skus', ctrlAdminSku.doAddSku);
router.get('/admin/skus/:sku_id/delete', ctrlAdminSku.deleteSku);

/* Manufacturer Admin */
router.get('/admin/mfgs', ctrlAdminMfg.mfgList);
router.get('/admin/mfgs/:mfg_id', ctrlAdminMfg.mfgInfo);
router.get('/admin/mfgs/new', ctrlAdminMfg.addMfg);
router.post('/admin/mfgs', ctrlAdminMfg.doAddMfg);
router.get('/admin/mfgs/:mfg_id/delete', ctrlAdminMfg.deleteMfg);

/* Location Admin */
router.get('/admin/locations', ctrlAdminLoc.locationList);
router.get('/admin/locations/:location_id', ctrlAdminLoc.locationInfo);
router.get('/admin/locations/new', ctrlAdminLoc.addLocation);
router.post('/admin/locations', ctrlAdminLoc.doAddLocation);
router.get('/admin/locations/:location_id/delete', ctrlAdminLoc.deleteLocation);

/*Group Admin*/
router.get('/admin/groups', ctrlAdminGroup.groupList);
router.get('/admin/groups/:group_id', ctrlAdminGroup.groupInfo);
router.get('/admin/groups/new', ctrlAdminGroup.addGroup);
router.post('/admin/groups', ctrlAdminGroup.doAddGroup);
router.get('/admin/groups/:group_id/delete', ctrlAdminGroup.deleteGroup);

/*Health Status Admin*/
router.get('/admin/hstats', ctrlAdminHStat.hstatList);
router.get('/admin/hstats/:hstat_id', ctrlAdminHStat.hstatInfo);
router.get('/admin/hstats/new', ctrlAdminHStat.addHStat);
router.post('/admin/hstats', ctrlAdminHStat.doAddHStat);
router.get('/admin/hstats/:hstat_id/delete', ctrlAdminHStat.deleteHStat);

/* API Help page */
router.get('/api_help', ctrlApiHelp.show);

module.exports = router;
