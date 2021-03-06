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

    tabviewCtrl.$inject = ['$modal', 'larrsData'];
    function tabviewCtrl ($modal, larrsData) {
        var
            vm = this;

        vm.pageHeader = {
            title : 'LaRRS',
            strapline: 'List of lab assets per lab location'
        };

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
                    vm.location = { assets: assetList };
                })
                .error(function (e) {
                    vm.message = "Sorry, something's gone wrong";
                    console.log(e);
                });
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
            });
        };
    }
})();