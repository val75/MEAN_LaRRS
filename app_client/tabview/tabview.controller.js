/*
 * app_client/tabview/tabview.controller.js - Angular controller for LaRRS tab view page
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
        .controller('tabviewCtrl', tabviewCtrl);

    tabviewCtrl.$inject = ['$modal', 'larrsData', 'authentication'];
    function tabviewCtrl ($modal, larrsData, authentication) {
        var
            vm = this;

        vm.pageHeader = {
            title : 'LaRRS',
            strapline: 'List of lab assets per lab location'
        };

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.rack_message = "Please select a lab location";

        larrsData.getLocationChildren('Root')
            .success(function (data) {
                var
                    locList = [];
                if (data.length) {
                    data.forEach(function (loc) {
                        var childrenList = [];
                        larrsData.getLocationChildren(loc.name)
                            .success(function (cdata) {
                                if (cdata.length) {
                                    cdata.forEach(function (child) {
                                        childrenList.push({
                                            id: child._id,
                                            name: child.name
                                        })
                                    });
                                }
                            });
                        locList.push({
                            id: loc._id,
                            name: loc.name,
                            nodes: childrenList
                        });
                    });
                }
                //console.log(locList);
                vm.treelocdata = { locs: locList };
            });

        vm.locSelected = function (location) {
            //console.log(location);
            larrsData.getLocationChildren(location.name)
                .success(function (data) {
                    vm.rack_message = data.length > 0 ? "" : "No racks found at this location";
                    var
                        rackList = [];
                    if (data.length) {
                        data.forEach(function (rack) {
                            rackList.push({
                                _id: rack._id,
                                name: rack.name
                            });
                        });
                        //console.log(rackList);
                    }
                    vm.rackdata = { racks: rackList };
                })
                .error(function (e) {
                    vm.message.mfgs = "Error retrieving rack locations: " + e;
                    console.log(e);
                });
        };

        vm.locationSelected = function (location) {
            larrsData.assetsAtLocation(location.name)
                .success(function (data) {
                    vm.message = data.length > 0 ? "" : "No assets found at this location";
                    var
                        assetList = [],
                        locList = [];

                    locList.push(location);

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
                                nic10g_mfg_name : doc.system[0].nic10g_mfg[0].name,
                                nic10g_model    : doc.system[0].nic10g_model,
                                resStatus       : doc.reserved,
                                currentResId    : doc.res_id
                            });
                        });
                    }
                    vm.location = { assets: assetList };
                    vm.locdata = { locs: locList };
                })
                .error(function (e) {
                    vm.message = "Sorry, something's gone wrong";
                    console.log(e);
                });
        };

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
                var
                    myAsset = {
                        _id             : data._id,
                        assetTag        : data.tag,
                        hostname        : data.hostname,
                        assetType       : data.type,
                        serial          : data.serial,
                        skuModel        : data.sku[0].name,
                        hwModel         : data.hwModel[0].name,
                        mfgName         : data.manufacturer[0].name,
                        locRU           : data.location_ru,
                        assetStatus     : data.healthStatus[0].name,
                        ip_10g          : data.network[0].ip_10g,
                        ip_1g           : data.network[0].ip_1g,
                        ip_bmc          : data.network[0].ip_bmc,
                        cpu_mfg_name    : data.system[0].cpu_mfg[0].name,
                        mem_mfg_name    : data.system[0].mem_mfg[0].name,
                        mem_size        : data.system[0].mem_size,
                        nic10g_mfg_name : data.system[0].nic10g_mfg[0].name,
                        nic10g_model    : data.system[0].nic10g_model,
                        resStatus       : data.reserved,
                        currentResId    : data.res_id
                    };
                //console.log(typeof data);
                //console.log(JSON.stringify(data));
                vm.location.assets.push(myAsset);
            });
        };

        // Function to search for a particular asset in the asset list based on asset_id
        // and update the asset reservation status with the new value
        vm.freeAssetReservationStatus = function (assetId) {
            return function () {
                //console.log("List: " + JSON.stringify(vm.location.assets));
                //console.log("Asset ID: " + assetId);
                for (var i=0; i < vm.location.assets.length; i++) {
                    if (vm.location.assets[i]._id === assetId) {
                        //console.log(vm.location.assets[i].resStatus);
                        vm.location.assets[i].resStatus = false;
                    }
                }
            }
        };

        // Function to search for a particular asset in the asset list based on asset_id
        // and update the asset reservation status to true (reserved), and also update
        // the asset current reservation ID with the new reservation ID
        vm.setAssetReservationStatus = function (asset_id, res_id) {
            return function () {
                for (var i=0; i < vm.location.assets.length; i++) {
                    if (vm.location.assets[i]._id === asset_id) {
                        //console.log(vm.location.assets[i].resStatus);
                        vm.location.assets[i].resStatus = true;
                        vm.location.assets[i].currentResId = res_id;
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
                //console.log(data._id);
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
                //console.log(data._id);
                var freeAsset = vm.freeAssetReservationStatus(data._id);
                freeAsset();
            });
        };
    }
})();