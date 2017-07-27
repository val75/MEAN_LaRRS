/**
 * Created by vghiur on 7/4/2017.
 */
angular.module('larrsApp', []);

var assetListCtrl = function ($scope, larrsData) {
    $scope.message = "Searching for assets...";
    larrsData
        .success(function (data) {
            $scope.message = data.length > 0 ? "" : "No assets found";
            var
                assetList = [];
            if ( data.length ) {
                data.forEach(function (doc) {
                    assetList.push({
                        _id: doc._id,
                        hostname: doc.hostname,
                        assetTag: doc.tag,
                        skuModel: doc.sku[0].name,
                        hwModel: doc.hwModel[0].name,
                        mfgName: doc.manufacturer[0].name,
                        locName: doc.location[0].name,
                        groupName: doc.group[0].name,
                        assetStatus: doc.healthStatus[0].name,
                        resStatus: doc.reserved,
                        currentResId: doc.res_id
                    });
                });
            }
            //console.log(assetList[0].skuModel);
            $scope.data = { assets: assetList };
        })
        .error(function (e) {
            $scope.message = "Sorry, something's gone wrong";
            console.log(e);
        });
    //$scope.data = { assets: larrsData };
};

var larrsData = function ($http) {
    //return $http.get('/api/assets');
    return $http({
        method: 'GET',
        url: '/api/assets',
        transformResponse: $http.defaults.transformResponse
    });
};

angular
    .module('larrsApp')
    .controller('assetListCtrl', assetListCtrl)
    .service('larrsData', larrsData);