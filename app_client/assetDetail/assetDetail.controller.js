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
                vm.data = { asset : data };
                vm.pageHeader = {
                    title: vm.data.asset.hostname
                };
            })
            .error(function (e) {
                console.log(e);
            });
    }
})();