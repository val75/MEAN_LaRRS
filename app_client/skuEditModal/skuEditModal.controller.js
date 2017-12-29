/*
 * app_client/skuEditModal/skuEditModal.controller.js - Angular
 * skuEditModal controller for larrsApp
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
        .controller('skuEditModalCtrl', skuEditModalCtrl);

    skuEditModalCtrl.$inject = ['$modalInstance', 'larrsData', 'itemData'];
    function skuEditModalCtrl ($modalInstance, larrsData, itemData) {
        var
            vm = this;

        larrsData.getSkuById(itemData._id)
            .success(function (data) {
                vm.formData = {
                    _id: data._id,
                    name: data.name,
                    notes: data.notes
                }
            })
            .error(function (data) {
                console.log("Error: " + JSON.stringify(data));
                vm.formError = "Error: " + data
            });

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.name) {
                vm.formError = "Field \"SKU Name\" required, please try again";
                return false;
            } else {
                //console.log(vm.formData);
                vm.doUpdateItem(vm.formData);
            }
        };

        vm.doUpdateItem = function (formData) {
            larrsData.updateSku(formData._id, {
                name: formData.name,
                notes: formData.notes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success updating SKU!");
                })
                .error(function (data) {
                    console.log("Error: " + JSON.stringify(data));
                    vm.formError = "Error updating SKU: " + data;
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