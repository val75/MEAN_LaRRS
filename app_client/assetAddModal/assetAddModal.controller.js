/*
 * app_client/assetAddModal/assetAddModal.controller.js - Angular
 * assetAddModal controller for larrsApp
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
        .controller('assetAddModalCtrl', assetAddModalCtrl);

    assetAddModalCtrl.$inject = ['$modalInstance', 'skuData', 'mfgData', 'hwmData', 'locData', 'grpData', 'hstatData'];
    function assetAddModalCtrl ($modalInstance, skuData, mfgData, hwmData, locData, grpData, hstatData) {
        var
            vm = this;
        vm.skuData = skuData.skuList;
        vm.mfgData = mfgData.mfgList;
        vm.hwmData = hwmData.hwmList;
        vm.locData = locData.locList;
        vm.grpData = grpData.groupList;
        vm.hstatData = hstatData.hstatList;

        vm.modal = {
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();