/*
 * app_client/hwmodelAddModal/hwmodelAddModal.controller.js - Angular
 * hwmodelAddModal controller for larrsApp
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
        .controller('hwmodelAddModalCtrl', hwmodelAddModalCtrl);

    hwmodelAddModalCtrl.$inject = ['$modalInstance', 'larrsData'];
    function hwmodelAddModalCtrl ($modalInstance, larrsData) {
        var
            vm = this;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.hwmName) {
                vm.formError = "Field \"Hardware Model Name\" required, please try again";
                return false;
            } else {
                  //console.log(vm.formData);
                  //return false;
                vm.doAddHwModel(vm.formData);
            }
        };

        vm.doAddHwModel = function (formData) {
            larrsData.addHwModel({
                name: formData.hwmName,
                notes: formData.hwmNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success adding Hardware Model!");
                })
                .error(function (data) {
                    vm.formError = "Error adding Hardware Model: " + data;
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