/*
 * app_client/reservationInfoModal/reservationInfoModal.controller.js - Angular
 * reservationInfoModal controller for larrsApp
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
        .controller('reservationInfoModalCtrl', reservationInfoModalCtrl);

    reservationInfoModalCtrl.$inject = ['$modalInstance', 'larrsData', 'reservationData'];
    function reservationInfoModalCtrl ($modalInstance, larrsData, reservationData) {
        var
            vm = this;

        larrsData.reservationById(reservationData.reservationId)
            .success(function (data) {
                vm.formResData = {
                    _id: reservationData._id,
                    tag: reservationData.tag,
                    hostname: reservationData.hostname,
                    reservationId: reservationData.reservationId,
                    userName: data.user,
                    resNotes: data.notes
                }
            })
            .error(function (data) {
                console.log("Error: " + JSON.stringify(data));
                vm.formError = "Error: " + data
            });

        vm.formResData = reservationData;

        vm.onSubmit = function () {
            vm.formError = "";
            //console.log(vm.formResData);
            vm.doDeleteReservation(vm.formResData);
        };

        vm.doDeleteReservation = function (formData) {
            larrsData.deleteReservation(formData.reservationId)
                .success(function (data) {
                    vm.modal.close(formData);
                    console.log("Reservation successfully released");
                })
                .error(function (data) {
                    vm.formError = "Error: " + data
                });
            return false;
        };

        vm.modal = {
            close : function (result) {
                $modalInstance.close(result)
            },
            cancel : function () {
                $modalInstance.dismiss('cancel')
            }
        };
    }
})();