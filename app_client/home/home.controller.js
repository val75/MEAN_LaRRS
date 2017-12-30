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

(function () {
    angular
        .module('larrsApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$modal', 'larrsData', 'authentication'];
    function homeCtrl ($scope, $modal, larrsData, authentication) {
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

        vm.isLoggedIn = authentication.isLoggedIn();

        larrsData.lData()
            .success(function (data) {
                vm.message = data.length > 0 ? "" : "No assets found";
                var
                    assetList = [];
                if ( data.length ) {
                    data.forEach(function (doc) {
                        assetList.push({
                            _id             : doc._id,
                            hostname        : doc.hostname,
                            assetTag        : doc.tag,
                            assetType       : doc.type,
                            serial          : doc.serial,
                            skuModel        : doc.sku[0].name,
                            hwModel         : doc.hwModel[0].name,
                            mfgName         : doc.manufacturer[0].name,
                            locName         : doc.location[0].name,
                            locRU           : doc.location_ru,
                            groupName       : doc.group[0].name,
                            assetStatus     : doc.healthStatus[0].name,
                            ip_10g          : doc.network[0].ip_10g,
                            ip_1g           : doc.network[0].ip_1g,
                            ip_bmc          : doc.network[0].ip_bmc,
                            cpu_mfg_name    : doc.system[0].cpu_mfg[0].name,
                            cpu_model       : doc.system[0].cpu_model,
                            mem_mfg_name    : doc.system[0].mem_mfg[0].name,
                            mem_size        : doc.system[0].mem_size,
                            disk_mfg_name   : doc.system[0].disk_mfg[0].name,
                            disk_model      : doc.system[0].disk_model,
                            nic10g_mfg_name : doc.system[0].nic10g_mfg[0].name,
                            nic10g_model    : doc.system[0].nic10g_model,
                            //resStatus: doc.reserved ? "Reserved" : "Free",
                            resStatus       : doc.reserved,
                            currentResId    : doc.res_id
                        });
                    });
                }
                vm.data = { assets: assetList };
            })
            .error(function (e) {
                $scope.message = "Sorry, something's gone wrong";
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

        vm.popupAssetAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/assetAddModal/assetAddModal.view.html',
                    controller: 'assetAddModalCtrl as vm',
                    resolve : {
                        skuData : function () {
                            return {
                                skuList : vm.skudata.skus
                            };
                        },
                        mfgData : function () {
                            return {
                                mfgList : vm.mfgdata.mfgs
                            };
                        },
                        hwmData : function () {
                            return {
                                hwmList : vm.hwmdata.hwms
                            };
                        },
                        locData : function () {
                            return {
                                locList : vm.locdata.locs
                            };
                        },
                        grpData : function () {
                            return {
                                groupList : vm.groupdata.grps
                            };
                        },
                        hstatData : function () {
                            return {
                                hstatList : vm.hstatdata.hstats
                            };
                        }
                    }
                });

            modalInstance.result.then(function (data) {
                var addAssetToHomePage = vm.addAssetToHome(data);
                addAssetToHomePage();
            });
        };

        // Function to add newly created asset to home page asset list dynamically
        // so that refresh is not required
        vm.addAssetToHome = function (doc) {
            return function () {
                vm.data.assets.push({
                    _id             : doc._id,
                    hostname        : doc.hostname,
                    assetTag        : doc.tag,
                    assetType       : doc.type,
                    serial          : doc.serial,
                    ip_10g          : doc.network[0].ip_10g,
                    ip_1g           : doc.network[0].ip_1g,
                    ip_bmc          : doc.network[0].ip_bmc,
                    skuModel        : doc.sku[0].name,
                    hwModel         : doc.hwModel[0].name,
                    mfgName         : doc.manufacturer[0].name,
                    locName         : doc.location[0].name,
                    groupName       : doc.group[0].name,
                    assetStatus     : doc.healthStatus[0].name,
                    cpu_mfg_name    : doc.system[0].cpu_mfg[0].name,
                    cpu_model       : doc.system[0].cpu_model,
                    mem_mfg_name    : doc.system[0].mem_mfg[0].name,
                    mem_size        : doc.system[0].mem_size,
                    disk_mfg_name   : doc.system[0].disk_mfg[0].name,
                    disk_model      : doc.system[0].disk_model,
                    nic10g_mfg_name : doc.system[0].nic10g_mfg[0].name,
                    nic10g_model    : doc.system[0].nic10g_model,
                    //resStatus: doc.reserved ? "Reserved" : "Free",
                    resStatus       : doc.reserved,
                    currentResId    : doc.res_id
                })
            }
        };

        // Function to search for a particular asset in the asset list based on asset_id
        // and update the asset reservation status to false (not reserved)
        vm.freeAssetReservationStatus = function (assetId) {
            return function () {
                //console.log("List: " + JSON.stringify(vm.data.assets));
                //console.log("Asset ID: " + assetId);
                for (var i=0; i < vm.data.assets.length; i++) {
                    if (vm.data.assets[i]._id === assetId) {
                        //console.log(vm.data.assets[i].resStatus);
                        vm.data.assets[i].resStatus = false;
                    }
                }
            }
        };

        // Function to search for a particular asset in the asset list based on asset_id
        // and update the asset reservation status to true (reserved), and also update
        // the asset current reservation ID with the new reservation ID
        vm.setAssetReservationStatus = function (asset_id, res_id) {
            return function () {
                for (var i=0; i < vm.data.assets.length; i++) {
                    if (vm.data.assets[i]._id === asset_id) {
                        //console.log(vm.data.assets[i].resStatus);
                        vm.data.assets[i].resStatus = true;
                        vm.data.assets[i].currentResId = res_id;
                    }
                }
            }
        };

        vm.popupReservationCreateForm = function (assetId, assetTag, assetHostname) {
            var
                modalInstance = $modal.open({
                    templateUrl: '/reservationCreateModal/reservationCreateModal.view.html',
                    controller: 'reservationCreateModalCtrl as vm',
                    resolve : {
                        assetData : function () {
                            return {
                                _id : assetId,
                                tag : assetTag,
                                hostname : assetHostname
                            };
                        }
                    }
                });

            modalInstance.result.then(function (data) {
                //console.log(JSON.stringify(data));
                var setAsset = vm.setAssetReservationStatus(data.assetId, data._id);
                setAsset();
            });
        };

        vm.popupReservationInfo = function (assetId, assetTag, assetHostname, reservationId) {
            var
                modalInstance = $modal.open({
                    templateUrl: '/reservationInfoModal/reservationInfoModal.view.html',
                    controller: 'reservationInfoModalCtrl as vm',
                    resolve : {
                        reservationData : function () {
                            return {
                                _id : assetId,
                                tag : assetTag,
                                hostname: assetHostname,
                                reservationId : reservationId
                            };
                        }
                    }
                });

            modalInstance.result.then(function (data) {
                var freeAsset = vm.freeAssetReservationStatus(data._id);
                freeAsset();
            });
        };

        vm.showError = function (error) {
            $scope.$apply(function () {
                vm.message = error.message;
            });
        };
    }
})();