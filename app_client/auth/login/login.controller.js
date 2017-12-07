/*
 * app_client/auth/login/login.controller.js - Angular controller for LaRRS user login page
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
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location', 'authentication'];

    function loginCtrl ($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title : 'LaRRS',
            strapline: 'Sign in to LaRRS'
        };

        vm.credentials = {
            email    : "",
            password : ""
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";

            if (!vm.credentials.email || !vm.credentials.password ) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
        };

        vm.doLogin = function () {
            vm.formError = "";

            authentication
                .login(vm.credentials)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                })
        };
    }
})();