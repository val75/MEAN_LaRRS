/*
 * app_client/reservationCreateModal/reservationCreateModal.controller.js - Angular
 * reservationCreateModal controller for larrsApp
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
        .controller('reservationCreateModalCtrl', reservationCreateModalCtrl);

    reservationCreateModalCtrl.$inject = ['$modalInstance', 'larrsData', 'assetData'];
    function reservationCreateModalCtrl ($modalInstance, larrsData, assetData) {
        var
            vm = this;

        vm.formResData = assetData;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formResData.userName || !vm.formResData.resNotes) {
                vm.formError = "All fields are required, please try again";
                return false;
            } else {
                //console.log(vm.formResData);
                vm.doCreateReservation(vm.formResData);
            }
        };

        vm.doCreateReservation = function (formData) {
            larrsData.createReservation({
                asset_id : formData._id,
                user : formData.userName,
                notes : formData.resNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success!");
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