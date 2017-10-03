/*
 * app_client/apiHelp/apiHelp.controller.js - Angular controller for LaRRS api_help page
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
        .controller('apiHelpCtrl', apiHelpCtrl);

    apiHelpCtrl.$inject = ['larrsData'];
    function apiHelpCtrl (larrsData) {
        var
            vm = this;

        vm.pageHeader = {
            title : 'LaRRS',
            strapline: 'API Documentation'
        };
    }
})();