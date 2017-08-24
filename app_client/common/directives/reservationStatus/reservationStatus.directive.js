/*
 * app_client/common/directives/reservationStatus/reservationStatus.directive.js - Angular
 * reservationStatus directive for larrsApp
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
        .directive('reservationStatus', reservationStatus);

    function reservationStatus() {
        return {
            restrict: 'EA',
            scope : {
                thisStatus : '=status'
            },
            templateUrl: '/common/directives/reservationStatus/reservationStatus.template.html'
        };
    }
})();