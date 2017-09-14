/*
 * app_client/app.js - Main Angular application file
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
    angular.module('larrsApp', ['ngRoute', 'ui.bootstrap']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/assets/:assetId/delete', {
                templateUrl: '/assetDelete/assetDelete.view.html',
                controller: 'assetDeleteCtrl',
                controllerAs: 'vm'
            })
            .when('/assets/:assetId', {
                templateUrl: '/assetDetail/assetDetail.view.html',
                controller: 'assetDetailCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    }

    angular
        .module('larrsApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();

