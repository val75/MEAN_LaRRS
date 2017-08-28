/*
 * app_client/common/directives/navigation/navigation.directive.js - Angular
 * navigation directive for larrsApp
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
        .directive('navigation', navigation);

    function navigation() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html'
        };
    }
})();