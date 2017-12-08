/*
 * app_client/common/directives/navigation/navigation.controller.js - Angular controller for LaRRS navigation directive
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
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$location', 'authentication'];

    function navigationCtrl ($location, authentication) {
        var vm = this;

        vm.currentPath = $location.path();

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.isAdmin = authentication.isAdmin();

        vm.currentUser = authentication.currentUser();

        vm.logout = function () {
            authentication.logout();
            $location.path('/');
        };
    }
})();