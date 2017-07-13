/**
 * Created by vghiur on 7/4/2017.
 */
angular.module('larrsApp', []);

var assetListCtrl = function ($scope) {
    $scope.data = {
        assets: [{
            _id: '1234567890',
            hostname: 'Server1',
            assetTag: 'ASSET12345',
            skuModel: 'P1G4',
            hwModel: 'Model1',
            mfgName: 'Dell',
            locName: 'SJC-Lab',
            groupName: 'DefaultGroup',
            healthStatus: 'Maintenance',
            resStatus: 'Free',
            currentResId: '111222333'
        }, {
            _id: '5678901234',
            hostname: 'Server2',
            assetTag: 'ASSET67890',
            skuModel: 'BD1G4',
            hwModel: 'Model1',
            mfgName: 'Hyve',
            locName: 'LVS02',
            groupName: 'DefaultGroup',
            healthStatus: 'Maintenance',
            resStatus: 'Free',
            currentResId: '44556677'
        }]
    };
};

angular
    .module('larrsApp')
    .controller('assetListCtrl', assetListCtrl);