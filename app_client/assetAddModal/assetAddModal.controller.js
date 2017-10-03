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

        vm.assetType = ['switch', 'server'];

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
                mySkuObj     = JSON.parse(formData.skuObj),
                myHwModel    = JSON.parse(formData.hwModelObj),
                myMfgObj     = JSON.parse(formData.mfgObj),
                myLocObj     = JSON.parse(formData.locObj),
                myGroupObj   = JSON.parse(formData.groupObj),
                myHstatObj   = JSON.parse(formData.hstatObj),
                myCpuMfgObj  = JSON.parse(formData.cpuMfgObj),
                myMemMfgObj  = JSON.parse(formData.memMfgObj),
                myNic10gMfgObj = JSON.parse(formData.nic10gMfgObj);

            larrsData.addAsset({
                tag: formData.assetTag,
                hostname: formData.hostName,
                type: formData.assetType,
                serial: formData.assetSerial,
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
                hstat_name: myHstatObj.name,
                cpu_mfg_id: myCpuMfgObj.id,
                cpu_mfg_name: myCpuMfgObj.name,
                cpu_model: formData.cpuModel,
                mem_mfg_id: myMemMfgObj.id,
                mem_mfg_name: myMemMfgObj.name,
                mem_size: formData.memSize,
                nic10g_mfg_id: myNic10gMfgObj.id,
                nic10g_mfg_name: myNic10gMfgObj.name,
                nic10g_model: formData.nic10GModel,
                ip_10g: formData.ip_10g,
                ip_1g: formData.ip_1g,
                ip_bmc: formData.ip_bmc

            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success! ");
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