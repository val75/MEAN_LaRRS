/*
 * app_client/common/services/larrsData.service.js - Angular larrsData service for larrsApp
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
        .service('larrsData', larrsData);

    larrsData.$inject = ['$http'];
    function larrsData ($http) {
        return $http({
            method: 'GET',
            url: '/api/assets',
            transformResponse: $http.defaults.transformResponse
        });
    }
})();