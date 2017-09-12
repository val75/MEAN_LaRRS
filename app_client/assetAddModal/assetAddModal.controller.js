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

    assetAddModalCtrl.$inject = ['$modalInstance', 'larrsData', 'skuData', 'mfgData', 'hwmData', 'locData', 'grpData', 'hstatData'];
    function assetAddModalCtrl ($modalInstance, larrsData, skuData, mfgData, hwmData, locData, grpData, hstatData) {
        var
            vm = this;
        vm.skuData = skuData.skuList;
        vm.mfgData = mfgData.mfgList;
        vm.hwmData = hwmData.hwmList;
        vm.locData = locData.locList;
        vm.grpData = grpData.groupList;
        vm.hstatData = hstatData.hstatList;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.assetTag || !vm.formData.hostName ) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddAsset(vm.formData);
            }
        };

        vm.doAddAsset = function (formData) {
            var
                mySkuObj = JSON.parse(formData.skuObj),
                myHwModel = JSON.parse(formData.hwModelObj),
                myMfgObj = JSON.parse(formData.mfgObj),
                myLocObj = JSON.parse(formData.locObj),
                myGroupObj = JSON.parse(formData.groupObj),
                myHstatObj = JSON.parse(formData.hstatObj);

            larrsData.addAsset({
                tag: formData.assetTag,
                hostname: formData.hostName,
                sku_id: mySkuObj.id,
                sku_name: mySkuObj.name,
                hwmodel_id: myHwModel.id,
                hwmodel_name: myHwModel.name,
                mfg_id: myMfgObj.id,
                mfg_name: myMfgObj.name,
                location_id: myLocObj.id,
                location_name: myLocObj.name,
                group_id: myGroupObj.id,
                group_name: myGroupObj.name,
                hstat_id: myHstatObj.id,
                hstat_name: myHstatObj.name
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success! " + data);
                })
                .error(function (data) {
                    vm.formError = "Error " + data;
                });
            return false;
        };

        vm.modal = {
            close : function (result) {
                $modalInstance.close(result);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();