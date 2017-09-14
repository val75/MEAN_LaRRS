/*
 * app_client/assetDelete/assetDelete.controller.js - Angular
 * assetDelete directive for larrsApp
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
        .controller('assetDeleteCtrl', assetDeleteCtrl);

    assetDeleteCtrl.$inject = ['$routeParams', 'larrsData'];
    function assetDeleteCtrl ($routeParams, larrsData) {
        var vm = this;

        vm.pageHeader = {
            title : 'LaRRS',
            strapline: 'Delete asset'
        };

        vm.assetId = $routeParams.assetId;

        larrsData.assetDelete(vm.assetId)
            .success(function (data) {
                console.log('Delete successful')
            })
            .error(function (e) {
                console.log(e)
            });
    }
})();