/*
 * app_client/skuAddModal/skuAddModal.controller.js - Angular
 * skuAddModal controller for larrsApp
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
        .controller('skuAddModalCtrl', skuAddModalCtrl);

    skuAddModalCtrl.$inject = ['$modalInstance', 'larrsData'];
    function skuAddModalCtrl ($modalInstance, larrsData) {
        var
            vm = this;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.skuName) {
                vm.formError = "Field \"SKU Name\" required, please try again";
                return false;
            } else {
                //console.log(vm.formData);
                vm.doAddSku(vm.formData);
            }
        };

        vm.doAddSku = function (formData) {
            larrsData.addSku({
                name: formData.skuName,
                notes: formData.skuNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success adding SKU!");
                })
                .error(function (data) {
                    vm.formError = "Error adding SKU: " + data;
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