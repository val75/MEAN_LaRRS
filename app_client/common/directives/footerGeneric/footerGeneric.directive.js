/*
 * app_client/common/directives/footerGeneric/footerGeneric.directive.js - Angular
 * footerGeneric directive for larrsApp
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
        .directive('footerGeneric', footerGeneric);

    function footerGeneric () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
        };
    }
})();
