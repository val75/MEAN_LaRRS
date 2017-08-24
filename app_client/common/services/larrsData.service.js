angular
    .module('larrsApp')
    .service('larrsData', larrsData);

function larrsData ($http) {
    return $http({
        method: 'GET',
        url: '/api/assets',
        transformResponse: $http.defaults.transformResponse
    });
}