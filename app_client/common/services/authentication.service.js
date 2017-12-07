/*
 * app_client/common/services/authentication.service.js - Angular authentication service for larrsApp
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
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication ($http, $window) {
        var saveToken = function (token) {
            $window.localStorage['larrs-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['larrs-token'];
        };

        var isLoggedIn = function () {
            var token = getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        
        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        var register = function (user) {
            return $http.post('/api/register', user).success(function (data) {
                saveToken(data.token);
            })
        };

        var login = function (user) {
            return $http.post('/api/login', user).success(function (data) {
                saveToken(data.token);
            })
        };

        var logout = function () {
            $window.localStorage.removeItem('larrs-token');
            $window.location.reload();
        };

        return {
            currentUser : currentUser,
            saveToken   : saveToken,
            getToken    : getToken,
            isLoggedIn  : isLoggedIn,
            register    : register,
            login       : login,
            logout      : logout
        };
    }
})();