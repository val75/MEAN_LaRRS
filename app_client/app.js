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
    angular.module('larrsApp', ['ngRoute']);

    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }

    angular
        .module('larrsApp')
        .config(['$routeProvider', config]);
})();

