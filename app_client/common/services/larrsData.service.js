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

    larrsData.$inject = ['$http', 'authentication'];
    function larrsData ($http, authentication) {
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
            return $http.delete('/api/assets/' + assetId, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var addAsset = function (data) {
            return $http.post('/api/assets', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var updateAsset = function (assetId, data) {
            return $http.put('/api/assets/' + assetId, data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var getSkus = function () {
            return $http.get('/api/skus')
        };

        var getSkuById = function (skuId) {
            return $http.get('/api/skus/' + skuId);
        };

        var addSku = function (data) {
            return $http.post('/api/skus', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var updateSku = function (skuId, data) {
            return $http.put('/api/skus/' + skuId, data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var getMfgs = function () {
            return $http.get('/api/manufacturers')
        };

        var addMfg = function (data) {
            return $http.post('/api/manufacturers', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var getHwModel = function () {
            return $http.get('/api/hwmodels')
        };

        var addHwModel = function (data) {
            return $http.post('/api/hwmodels', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
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
            return $http.post('/api/locations', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var getGroup = function () {
            return $http.get('/api/groups')
        };

        var addGroup = function (data) {
            return $http.post('/api/groups', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var getHealthStatus = function () {
            return $http.get('/api/hStatus')
        };

        var addHealthStatus = function (data) {
            return $http.post('/api/hStatus', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var createReservation = function (data) {
            return $http.post('/api/reservations', data, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var reservationById = function (reservationId) {
            return $http.get('/api/reservations/' + reservationId)
        };

        var deleteReservation = function (reservationId) {
            return $http.delete('/api/reservations/' + reservationId, {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            })
        };

        return {
            lData: lData,
            assetsAtLocation    : assetsAtLocation,
            assetById           : assetById,
            assetDelete         : assetDelete,
            addAsset            : addAsset,
            updateAsset         : updateAsset,
            getSkus             : getSkus,
            getSkuById          : getSkuById,
            addSku              : addSku,
            updateSku           : updateSku,
            getMfgs             : getMfgs,
            addMfg              : addMfg,
            getHwModel          : getHwModel,
            addHwModel          : addHwModel,
            getLocation         : getLocation,
            getLocationById     : getLocationById,
            getLocationChildren : getLocationChildren,
            addLocation         : addLocation,
            getGroup            : getGroup,
            addGroup            : addGroup,
            getHealthStatus     : getHealthStatus,
            addHealthStatus     : addHealthStatus,
            createReservation   : createReservation,
            reservationById     : reservationById,
            deleteReservation   : deleteReservation
        };
    }
})();