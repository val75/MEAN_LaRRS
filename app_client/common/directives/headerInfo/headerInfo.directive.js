/*
 * app_client/common/directives/headerInfo/headerInfo.directive.js - Angular
 * headerInfo directive for larrsApp
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
        .directive('headerInfo', headerInfo);

    function headerInfo () {
        return {
            restrict: 'EA',
            scope: {
                content : '=content',
                asset: '=asset'
            },
            templateUrl: '/common/directives/headerInfo/headerInfo.template.html'
        };
    }
})();