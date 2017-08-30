/*
 * app_client/assetDetail/assetDetail.controller.js - Angular
 * assetDetail directive for larrsApp
 */

/*jslint        node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */
'use strict';

(function () {
    angular
        .module('larrsApp')
        .controller('assetDetailCtrl', assetDetailCtrl);

    assetDetailCtrl.$inject = ['$routeParams', 'larrsData'];
    function assetDetailCtrl ($routeParams, larrsData) {
        var vm = this;
        vm.assetId = $routeParams.assetId;

        larrsData.assetById(vm.assetId)
            .success(function (data) {
                var assetInfo = [];
                assetInfo = {
                    _id: data._id,
                    hostname: data.hostname,
                    tag: data.tag,
                    skuModel: data.sku[0].name,
                    hwModel: data.hwModel[0].name,
                    mfgName: data.manufacturer[0].name,
                    locName: data.location[0].name,
                    groupName: data.group[0].name,
                    hStatus: data.healthStatus[0].name,
                    resStatus: data.reserved,
                    currentResId: data.res_id
                };
                vm.data = { asset : assetInfo };
                vm.pageHeader = {
                    title: vm.data.asset.hostname
                };
            })
            .error(function (e) {
                console.log(e);
            });
    }
})();