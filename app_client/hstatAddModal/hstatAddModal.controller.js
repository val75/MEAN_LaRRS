/*
 * app_client/hstatAddModal/hstatAddModal.controller.js - Angular
 * hstatAddModal controller for larrsApp
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
        .controller('hstatAddModalCtrl', hstatAddModalCtrl);

    hstatAddModalCtrl.$inject = ['$modalInstance', 'larrsData'];
    function hstatAddModalCtrl ($modalInstance, larrsData) {
        var
            vm = this;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.hstatName) {
                vm.formError = "Field \"Health Status Name\" required, please try again";
                return false;
            } else {
                //  console.log(vm.formData);
                vm.doAddHstat(vm.formData);
            }
        };

        vm.doAddHstat = function (formData) {
            larrsData.addHealthStatus({
                name: formData.hstatName,
                notes: formData.hstatNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success adding Health Status!");
                })
                .error(function (data) {
                    vm.formError = "Error adding Health Status: " + data;
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