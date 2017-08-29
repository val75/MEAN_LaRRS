/*
 * app_client/common/directives/pageHeader/pageHeader.directive.js - Angular
 * pageHeader directive for larrsApp
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
        .directive('pageHeader', pageHeader);

    function pageHeader () {
        return {
            restrict: 'EA',
            scope: {
                content : '=content'
            },
            templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
        };
    }
})();