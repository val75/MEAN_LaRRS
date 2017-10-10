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

    assetDetailCtrl.$inject = ['$routeParams', '$modal', 'larrsData'];
    function assetDetailCtrl ($routeParams, $modal, larrsData) {
        var vm = this;
        vm.assetId = $routeParams.assetId;

        larrsData.assetById(vm.assetId)
            .success(function (data) {
                var assetInfo = [];
                assetInfo = {
                    _id             : data._id,
                    hostname        : data.hostname,
                    tag             : data.tag,
                    type            : data.type,
                    serial          : data.serial,
                    skuModel        : data.sku[0].name,
                    hwModel         : data.hwModel[0].name,
                    mfgName         : data.manufacturer[0].name,
                    locName         : data.location[0].name,
                    locRU           : data.location_ru,
                    groupName       : data.group[0].name,
                    hStatus         : data.healthStatus[0].name,
                    ip_10g          : data.network[0].ip_10g,
                    ip_1g           : data.network[0].ip_1g,
                    ip_bmc          : data.network[0].ip_bmc,
                    cpu_mfg_name    : data.system[0].cpu_mfg[0].name,
                    cpu_model       : data.system[0].cpu_model,
                    mem_mfg_name    : data.system[0].mem_mfg[0].name,
                    mem_size        : data.system[0].mem_size,
                    nic10g_mfg_name : data.system[0].nic10g_mfg[0].name,
                    nic10g_model    : data.system[0].nic10g_model,
                    resStatus       : data.reserved,
                    currentResId    : data.res_id
                };
                vm.data = { asset : assetInfo };
                vm.pageHeader = {
                    title: vm.data.asset.hostname
                };
            })
            .error(function (e) {
                console.log(e);
            });

        vm.popupReservationCreateForm = function (assetId, assetTag, assetHostname) {
            var
                modalInstance = $modal.open({
                    templateUrl: '/reservationCreateModal/reservationCreateModal.view.html',
                    controller: 'reservationCreateModalCtrl as vm',
                    resolve: {
                        assetData: function () {
                            return {
                                _id: assetId,
                                tag: assetTag,
                                hostname: assetHostname
                            };
                        }
                    }
                });
        };

        vm.popupReservationInfo = function (assetId, assetTag, assetHostname, reservationId) {
            var
                modalInstance = $modal.open({
                    templateUrl: '/reservationInfoModal/reservationInfoModal.view.html',
                    controller: 'reservationInfoModalCtrl as vm',
                    resolve: {
                        reservationData: function () {
                            return {
                                _id: assetId,
                                tag: assetTag,
                                hostname: assetHostname,
                                reservationId: reservationId
                            };
                        }
                    }
                });
        };
    }
})();