/*
 * app_client/common/directives/reservationButton/reservationButton.directive.js - Angular
 * reservationButton directive for larrsApp
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
        .directive('reservationButton', reservationButton);

    function reservationButton() {
        return {
            scope : {
                thisStatus  : '=status',
                thisAssetId : '=id'
            },
            templateUrl : '/common/directives/reservationButton/reservationButton.template.html'
        }
    }
})();
