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
        var lData = function () {
            return $http({
                method: 'GET',
                url: '/api/assets',
                transformResponse: $http.defaults.transformResponse
            });
        };

        var assetById = function (assetId) {
            return $http.get('/api/assets/' + assetId);
        };

        var assetDelete = function (assetId) {
            return $http.delete('/api/assets/' + assetId);
        };

        var addAsset = function (data) {
            return $http.post('/api/assets', data);
        };

        var updateAsset = function (assetId, data) {
            return $http.put('/api/assets/' + assetId, data);
        };

        var getSkus = function () {
            return $http.get('/api/skus')
        };

        var addSku = function (data) {
            return $http.post('/api/skus', data);
        };

        var getMfgs = function () {
            return $http.get('/api/manufacturers')
        };

        var getHwModel = function () {
            return $http.get('/api/hwmodels')
        };

        var getLocation = function () {
            return $http.get('/api/locations')
        };

        var getGroup = function () {
            return $http.get('/api/groups')
        };

        var getHealthStatus = function () {
            return $http.get('/api/hStatus')
        };

        var createReservation = function (data) {
            return $http.post('/api/reservations', data);
        };

        var reservationById = function (reservationId) {
            return $http.get('/api/reservations/' + reservationId)
        };

        var deleteReservation = function (reservationId) {
            return $http.delete('/api/reservations/' + reservationId)
        };

        return {
            lData: lData,
            assetById: assetById,
            assetDelete: assetDelete,
            addAsset: addAsset,
            updateAsset: updateAsset,
            getSkus: getSkus,
            addSku: addSku,
            getMfgs: getMfgs,
            getHwModel: getHwModel,
            getLocation : getLocation,
            getGroup: getGroup,
            getHealthStatus: getHealthStatus,
            createReservation: createReservation,
            reservationById: reservationById,
            deleteReservation: deleteReservation
        };
    }
})();