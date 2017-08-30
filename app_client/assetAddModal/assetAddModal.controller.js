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

    assetAddModalCtrl.$inject = ['$modalInstance', 'skuData'];
    function assetAddModalCtrl ($modalInstance, skuData) {
        var
            vm = this;
        vm.skuData = skuData.skuList;

        vm.modal = {
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();