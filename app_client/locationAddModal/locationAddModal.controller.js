/*
 * app_client/locationAddModal/locationAddModal.controller.js - Angular
 * locationAddModal controller for larrsApp
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
        .controller('locationAddModalCtrl', locationAddModalCtrl);

    locationAddModalCtrl.$inject = ['$modalInstance', 'larrsData'];
    function locationAddModalCtrl ($modalInstance, larrsData) {
        var
            vm = this;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.locName) {
                vm.formError = "Field \"Location Name\" required, please try again";
                return false;
            } else {
                //  console.log(vm.formData);
                vm.doAddLocation(vm.formData);
            }
        };

        vm.doAddLocation = function (formData) {
            larrsData.addLocation({
                name: formData.locName,
                notes: formData.locNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success adding Location!");
                })
                .error(function (data) {
                    vm.formError = "Error adding Location: " + data;
                });
            return false;
        };

        vm.modal = {
            close : function (result) {
                $modalInstance.close(result)
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        }
    }
})();