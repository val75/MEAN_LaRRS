/* GET assets list page */
module.exports.assetList = function (req, res) {
    res.render('asset-list', {
        title: 'LaRRS - Lab Reservation and Reclamation System',
        pageHeader: {
            title: 'LaRRS',
            strapline: 'List of lab assets in all HWE Labs'
        },
        assets: [{
            hostname: 'Server1',
            assetTag: 'ASSET12345678',
            skuModel: 'P1-G4',
            mfgName: 'Dell',
            locName: 'LVS02',
            assetStatus: 'Maintenance'
        },{
            hostname: 'Server2',
            assetTag: 'ASSET3456789',
            skuModel: 'P2-G5',
            mfgName: 'Hyve',
            locName: 'LVS02',
            assetStatus: 'Free'
        }]
    });
};

/* GET asset info page */
module.exports.assetInfo = function (req, res) {
    res.render('asset-info', {
        title: 'Server1',
        pageHeader: {
            title: 'Server1'
        },
        asset: {
            hostname: 'Server1',
            assetTag: 'ASSET12345678',
            skuModel: 'P1-G4',
            mfgName: 'Dell',
            locName: 'LVS02',
            groupName: 'Default Group',
            healthStatus: 'Maintenance',
            resStatus: 'Not Available'
        }
    });
};

/* GET edit asset page */
module.exports.assetEdit = function (req, res) {
    res.render('asset-edit', {
        title: 'Server1 - Edit Asset',
        pageHeader: {
            title: 'Edit Server1'
        }
    });
};