var express = require('express');
var router = express.Router();
var ctrlAssets = require('../controllers/assets');
var ctrlAdmin = require('../controllers/admin');
var ctrlAdminSku = require('../controllers/adminSku');
var ctrlAdminMfg = require('../controllers/adminMfg');
var ctrlApiHelp = require('../controllers/api_help');

/* Assets pages */
router.get('/', ctrlAssets.assetList);
router.get('/assets/:assetId', ctrlAssets.assetInfo);
router.get('/asset-edit', ctrlAssets.assetEdit);

/* Admin pages */
router.get('/admin', ctrlAdmin.taskList);

/* SKU Admin */
router.get('/admin/skus', ctrlAdminSku.skuList);
router.get('/admin/skus/new', ctrlAdminSku.addSku);
router.post('/admin/skus', ctrlAdminSku.doAddSku);
router.get('/admin/skus/:sku_id/delete', ctrlAdminSku.deleteSku);

/* Manufacturer Admin */
router.get('/admin/mfgs', ctrlAdminMfg.mfgList);
router.get('/admin/mfgs/new', ctrlAdminMfg.addMfg);
router.post('/admin/mfgs', ctrlAdminMfg.doAddMfg);
router.get('/admin/mfgs/:mfg_id/delete', ctrlAdminMfg.deleteMfg);

router.get('/admin/locations', ctrlAdmin.locationList);
router.get('/admin/groups', ctrlAdmin.groupList);
router.get('/admin/hstats', ctrlAdmin.hstatList);

/* API Help page */
router.get('/api_help', ctrlApiHelp.show);

module.exports = router;
