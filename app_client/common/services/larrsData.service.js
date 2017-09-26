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

        var assetsAtLocation = function (locationName) {
            return $http.get('/api/assets?location.name=' + locationName);
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

        var addMfg = function (data) {
            return $http.post('/api/manufacturers', data);
        };

        var getHwModel = function () {
            return $http.get('/api/hwmodels')
        };

        var addHwModel = function (data) {
            return $http.post('/api/hwmodels', data);
        };

        var getLocation = function () {
            return $http.get('/api/locations')
        };

        var getLocationById = function (locationId) {
            return $http.get('/api/locations/' + locationId);
        };

        var getLocationChildren = function (parentName) {
            return $http.get('/api/locations?parent_name=' + parentName);
        };

        var addLocation = function (data) {
            return $http.post('/api/locations', data);
        };

        var getGroup = function () {
            return $http.get('/api/groups')
        };

        var addGroup = function (data) {
            return $http.post('/api/groups', data);
        };

        var getHealthStatus = function () {
            return $http.get('/api/hStatus')
        };

        var addHealthStatus = function (data) {
            return $http.post('/api/hStatus', data);
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
            assetsAtLocation: assetsAtLocation,
            assetById: assetById,
            assetDelete: assetDelete,
            addAsset: addAsset,
            updateAsset: updateAsset,
            getSkus: getSkus,
            addSku: addSku,
            getMfgs: getMfgs,
            addMfg: addMfg,
            getHwModel: getHwModel,
            addHwModel: addHwModel,
            getLocation : getLocation,
            getLocationById: getLocationById,
            getLocationChildren: getLocationChildren,
            addLocation: addLocation,
            getGroup: getGroup,
            addGroup: addGroup,
            getHealthStatus: getHealthStatus,
            addHealthStatus: addHealthStatus,
            createReservation: createReservation,
            reservationById: reservationById,
            deleteReservation: deleteReservation
        };
    }
})();