/*
 * app_client/common/directives/reservationInfo/reservationInfo.directive.js - Angular
 * reservationInfo directive for larrsApp
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
        .directive('reservationInfo', reservationInfo);

    function reservationInfo() {
        return {
            scope: {
                thisReservationId : '=id'
            },
            templateUrl : '/common/directives/reservationInfo/reservationInfo.template.html'
        }
    }
})();