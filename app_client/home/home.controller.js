/*
 * app_client/home/home.controller.js - Angular controller for LaRRS home page
 */

/*jslint        node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */
'use strict';

angular
    .module('larrsApp')
    .controller('homeCtrl', homeCtrl);

function homeCtrl ($scope, larrsData) {
    var
        vm = this;

    vm.pageHeader = {
        title : 'LaRRS',
        strapline: 'List of lab assets in all HWE Labs'
    };
    vm.sidebar = {
        content : 'LaRRS helps you reserve an asset in HWE Labs and takes care of it once it is released'
    };

    //vm.message = "Checking for lab assets...";

    larrsData
        .success(function (data) {
            vm.message = data.length > 0 ? "" : "No assets found";
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
                        resStatus: doc.reserved ? "Reserved" : "Free",
                        currentResId: doc.res_id
                    });
                });
            }
            vm.data = { assets: assetList };
        })
        .error(function (e) {
            $scope.message = "Sorry, something's gone wrong";
            console.log(e);
        });

    vm.showError = function (error) {
        $scope.$apply(function () {
            vm.message = error.message;
        });
    };
}