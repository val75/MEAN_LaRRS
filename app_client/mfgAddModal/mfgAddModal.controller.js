/*
 * app_client/mfgAddModal/mfgAddModal.controller.js - Angular
 * mfgAddModal controller for larrsApp
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
        .controller('mfgAddModalCtrl', mfgAddModalCtrl);

    mfgAddModalCtrl.$inject = ['$modalInstance', 'larrsData'];
    function mfgAddModalCtrl ($modalInstance, larrsData) {
        var
            vm = this;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.mfgName) {
                vm.formError = "Field \"Manufacturer Name\" required, please try again";
                return false;
            } else {
                //  console.log(vm.formData);
                vm.doAddMfg(vm.formData);
            }
        };

        vm.doAddMfg = function (formData) {
            larrsData.addMfg({
                name: formData.mfgName,
                notes: formData.mfgNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success adding Manufacturer!");
                })
                .error(function (data) {
                    vm.formError = "Error adding Manufacturer: " + data;
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