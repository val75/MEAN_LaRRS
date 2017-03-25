/* GET assets list page */
module.exports.assetList = function (req, res) {
    res.render('asset-list', { title: 'Asset List' });
};

/* GET asset info page */
module.exports.assetInfo = function (req, res) {
    res.render('asset-info', { title: 'Asset Info' });
};

/* GET edit asset page */
module.exports.assetEdit = function (req, res) {
    res.render('asset-edit', { title: 'Edit Asset' });
};