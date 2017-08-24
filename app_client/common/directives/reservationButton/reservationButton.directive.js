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