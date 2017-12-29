/*
 * app_client/admin/admin.controller.js - Angular controller for LaRRS admin page
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
        .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$modal', 'larrsData'];
    function adminCtrl ($modal, larrsData) {
        var
            vm = this;

        vm.pageHeader = {
            title : 'LaRRS',
            strapline: 'App Administration'
        };

        vm.message = {};

        larrsData.getSkus()
            .success(function (data) {
                vm.message.skus = data.length > 0 ? "" : "No SKUs found";
                var
                    skuList = [];
                if (data.length) {
                    data.forEach(function (sku) {
                        skuList.push({
                            _id: sku._id,
                            name: sku.name,
                            notes: sku.notes
                        });
                    });
                }
                vm.skudata = { skus: skuList };
            })
            .error(function (e) {
                vm.message.skus = "Error retrieving SKUs: " + e;
                console.log(e);
            });

        larrsData.getHwModel()
            .success(function (data) {
                vm.message.hwms = data.length > 0 ? "" : "No Hardware Models found";
                var
                    hwmList = [];
                if (data.length) {
                    data.forEach(function (hwm) {
                        hwmList.push({
                            _id: hwm._id,
                            name: hwm.name,
                            notes: hwm.notes
                        });
                    });
                }
                vm.hwmdata = { hwms : hwmList };
            })
            .error(function (e) {
                vm.message.hwms = "Error retrieving Hardware Models: " + e;
                console.log(e);
            });

        larrsData.getMfgs()
            .success(function (data) {
                vm.message.mfgs = data.length > 0 ? "" : "No Manufactures found";
                var
                    mfgList = [];
                if (data.length) {
                    data.forEach(function (mfg) {
                        mfgList.push({
                            _id: mfg._id,
                            name: mfg.name,
                            notes: mfg.notes
                        });
                    });
                }
                vm.mfgdata = { mfgs : mfgList };
            })
            .error(function (e) {
                vm.message.mfgs = "Error retrieving Manufacturers: " + e;
                console.log(e);
            });

        larrsData.getLocation()
            .success(function (data) {
                vm.message.locs = data.length > 0 ? "" : "No Locations found";
                var
                    locList = [];
                if (data.length) {
                    data.forEach(function (loc) {
                        locList.push({
                            _id: loc._id,
                            name: loc.name,
                            notes: loc.notes
                        });
                    });
                }
                vm.locdata = { locs : locList };
            })
            .error(function (e) {
                vm.message.mfgs = "Error retrieving Locations: " + e;
                console.log(e);
            });

        larrsData.getGroup()
            .success(function (data) {
                vm.message.grps = data.length > 0 ? "" : "No Groups found";
                var
                    groupList = [];
                if (data.length) {
                    data.forEach(function (grp) {
                        groupList.push({
                            _id: grp._id,
                            name: grp.name,
                            notes: grp.notes
                        });
                    });
                }
                vm.groupdata = { grps : groupList };
            })
            .error(function (e) {
                vm.message.grps = "Error retrieving Groups: " + e;
                console.log(e);
            });

        larrsData.getHealthStatus()
            .success(function (data) {
                vm.message.hstats = data.length > 0 ? "" : "No Health Stats found";
                var
                    hStatList = [];
                if (data.length) {
                    data.forEach(function (hstat) {
                        hStatList.push({
                            _id: hstat._id,
                            name: hstat.name,
                            notes: hstat.notes
                        });
                    });
                }
                vm.hstatdata = { hstats : hStatList };
            })
            .error(function (e) {
                vm.message.hstats = "Error retrieving Health Stats: " + e;
                console.log(e);
            });

        vm.popupSkuAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/skuAddModal/skuAddModal.view.html',
                    controller: 'skuAddModalCtrl as vm'
                });

            modalInstance.result.then(function (data) {
                vm.skudata.skus.push(data);
            });
        };

        vm.popupHwModelAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/hwmodelAddModal/hwmodelAddModal.view.html',
                    controller: 'hwmodelAddModalCtrl as vm'
                });

            modalInstance.result.then(function (data) {
                vm.hwmdata.hwms.push(data);
            });
        };

        vm.popupMfgAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/mfgAddModal/mfgAddModal.view.html',
                    controller: 'mfgAddModalCtrl as vm'
                });

            modalInstance.result.then(function (data) {
                vm.mfgdata.mfgs.push(data);
            });
        };

        vm.popupLocationAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/locationAddModal/locationAddModal.view.html',
                    controller: 'locationAddModalCtrl as vm'
                });

            modalInstance.result.then(function (data) {
                vm.locdata.locs.push(data);
            });
        };

        vm.popupGroupAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/groupAddModal/groupAddModal.view.html',
                    controller: 'groupAddModalCtrl as vm'
                });

            modalInstance.result.then(function (data) {
                vm.groupdata.grps.push(data);
            });
        };

        vm.popupHstatAddForm = function () {
            var
                modalInstance = $modal.open({
                    templateUrl: '/hstatAddModal/hstatAddModal.view.html',
                    controller: 'hstatAddModalCtrl as vm'
                });

            modalInstance.result.then(function (data) {
                vm.hstatdata.hstats.push(data);
            });
        };

        vm.updateSku = function (skuId, skuName, skuNotes) {
            return function () {
                for (var i=0; i < vm.skudata.skus.length; i++) {
                    if (vm.skudata.skus[i]._id === skuId) {
                        vm.skudata.skus[i].name = skuName;
                        vm.skudata.skus[i].notes = skuNotes;
                    }
                }
            }
        };

        vm.popupSkuEditForm = function (itemId, itemName, itemNotes) {
            var
                modalInstance = $modal.open({
                    templateUrl: '/skuEditModal/skuEditModal.view.html',
                    controller: 'skuEditModalCtrl as vm',
                    resolve : {
                        itemData : function () {
                            return {
                                _id : itemId,
                                name : itemName,
                                notes : itemNotes
                            };
                        }
                    }
                });

            modalInstance.result.then(function (data) {
                var updateSku = vm.updateSku(data._id, data.name, data.notes);
                updateSku();
            });
        };
    }
})();