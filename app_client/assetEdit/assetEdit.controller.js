/*
 * app_client/assetEdit/assetEdit.controller.js - Angular
 * assetEdit controller for larrsApp
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
        .controller('assetEditCtrl', assetEditCtrl);

    assetEditCtrl.$inject = ['$location', '$routeParams', 'larrsData'];
    function assetEditCtrl ($location, $routeParams, larrsData) {
        var vm = this;
        vm.assetId = $routeParams.assetId;

        larrsData.assetById(vm.assetId)
            .success(function (data) {
                var assetInfo = [];
                assetInfo = {
                    _id: data._id,
                    hostname: data.hostname,
                    tag: data.tag,
                    skuModel: {
                        _id: data.sku[0].id,
                        name: data.sku[0].name
                    },
                    hwModel: {
                        _id: data.hwModel[0].id,
                        name: data.hwModel[0].name
                    },
                    mfgName: {
                        _id: data.manufacturer[0].id,
                        name: data.manufacturer[0].name
                    },
                    locName: {
                        _id: data.location[0].id,
                        name: data.location[0].name
                    },
                    groupName: {
                        _id: data.group[0].id,
                        name: data.group[0].name
                    },
                    hStatus: {
                        _id: data.healthStatus[0].id,
                        name: data.healthStatus[0].name
                    },
                    resStatus: data.reserved,
                    currentResId: data.res_id
                };
                vm.data = { asset : assetInfo };
                vm.pageHeader = {
                    title: 'LaRRS',
                    strapline: 'Edit asset ' + vm.data.asset.hostname
                };
            })
            .error(function (e) {
                console.log(e);
            });

        larrsData.getSkus()
            .success(function (data) {
                var
                    skuList = [];
                if (data.length) {
                    data.forEach(function (sku) {
                        skuList.push({
                            _id: sku._id,
                            name: sku.name
                        });
                    });
                }
                vm.skudata = { skus: skuList };
            });

        larrsData.getHwModel()
            .success(function (data) {
                var
                    hwmList = [];
                if (data.length) {
                    data.forEach(function (hwm) {
                        hwmList.push({
                            _id: hwm._id,
                            name: hwm.name
                        });
                    });
                }
                vm.hwmdata = { hwms : hwmList };
            });

        larrsData.getLocation()
            .success(function (data) {
                var
                    locList = [];
                if (data.length) {
                    data.forEach(function (loc) {
                        locList.push({
                            _id: loc._id,
                            name: loc.name
                        });
                    });
                }
                vm.locdata = { locs : locList };
            });

        larrsData.getMfgs()
            .success(function (data) {
                var
                    mfgList = [];
                if (data.length) {
                    data.forEach(function (mfg) {
                        mfgList.push({
                            _id: mfg._id,
                            name: mfg.name
                        });
                    });
                }
                vm.mfgdata = { mfgs : mfgList };
            });

        larrsData.getGroup()
            .success(function (data) {
                var
                    groupList = [];
                if (data.length) {
                    data.forEach(function (grp) {
                        groupList.push({
                            _id: grp._id,
                            name: grp.name
                        });
                    });
                }
                vm.groupdata = { grps : groupList };
            });

        larrsData.getHealthStatus()
            .success(function (data) {
                var
                    hStatList = [];
                if (data.length) {
                    data.forEach(function (hstat) {
                        hStatList.push({
                            _id: hstat._id,
                            name: hstat.name
                        });
                    });
                }
                vm.hstatdata = { hstats : hStatList };
            });
        
        vm.onSubmit = function () {
            vm.doUpdateAsset();
        };

        vm.doUpdateAsset = function () {

            larrsData.updateAsset(vm.assetId, {
                tag: vm.data.asset.tag,
                hostname: vm.data.asset.hostname,
                sku_id: vm.data.asset.skuModel._id,
                sku_name: vm.data.asset.skuModel.name,
                hwmodel_id: vm.data.asset.hwModel._id,
                hwmodel_name: vm.data.asset.hwModel.name,
                mfg_id: vm.data.asset.mfgName._id,
                mfg_name: vm.data.asset.mfgName.name,
                location_id: vm.data.asset.locName._id,
                location_name: vm.data.asset.locName.name,
                group_id: vm.data.asset.groupName._id,
                group_name: vm.data.asset.groupName.name,
                hstat_id: vm.data.asset.hStatus._id,
                hstat_name: vm.data.asset.hStatus.name
            })
                .success(function (data) {
                    console.log("Success!");
                    $location.path('/');
                })
                .error(function (data) {
                    console.log("Error: " + JSON.stringify(data));
                });
        };
    }
})();