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