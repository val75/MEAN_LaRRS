var express = require('express');
var router = express.Router();
var ctrlAssets = require('../controllers/assets');
var ctrlAdmin = require('../controllers/admin');
var ctrlApiHelp = require('../controllers/api_help');

/* Assets pages */
router.get('/', ctrlAssets.assetList);
router.get('/asset', ctrlAssets.assetInfo);
router.get('/asset-edit', ctrlAssets.assetEdit);

/* Admin pages */
router.get('/admin', ctrlAdmin.taskList);

/* API Help page */
router.get('/api_help', ctrlApiHelp.show);

module.exports = router;
