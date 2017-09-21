/*
 * app_client/groupAddModal/groupAddModal.controller.js - Angular
 * groupAddModal controller for larrsApp
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
        .controller('groupAddModalCtrl', groupAddModalCtrl);

    groupAddModalCtrl.$inject = ['$modalInstance', 'larrsData'];
    function groupAddModalCtrl ($modalInstance, larrsData) {
        var
            vm = this;

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.groupName) {
                vm.formError = "Field \"Group Name\" required, please try again";
                return false;
            } else {
                //  console.log(vm.formData);
                vm.doAddGroup(vm.formData);
            }
        };

        vm.doAddGroup = function (formData) {
            larrsData.addGroup({
                name: formData.groupName,
                notes: formData.groupNotes
            })
                .success(function (data) {
                    vm.modal.close(data);
                    console.log("Success adding Group!");
                })
                .error(function (data) {
                    vm.formError = "Error adding Group: " + data;
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