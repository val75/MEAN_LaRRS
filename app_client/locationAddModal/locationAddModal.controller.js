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

        vm.locType = ['city', 'lab', 'rack', 'chassis'];

        larrsData.getLocation()
            .success(function (data) {
                var
                    locList = [];
                if (data.length) {
                    data.forEach(function (loc) {
                        locList.push({
                            _id: loc._id,
                            name: loc.name
                        });
                    });
                }
                vm.locdata = { locs : locList };
            })
            .error(function (e) {
                vm.message.mfgs = "Error retrieving Locations: " + e;
                console.log(e);
            });

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
            var
                myLocParentObj = JSON.parse(formData.locParentObj),
                myLocAncestors = [];

            myLocAncestors.push(myLocParentObj);

            larrsData.getLocationById(myLocParentObj.id)
                .success(function (data) {
                    console.log(data);
                    data.ancestors.forEach(function (ancestor) {
                        myLocAncestors.push(ancestor);
                    });

                    larrsData.addLocation({
                        name: formData.locName,
                        type: formData.locType,
                        parent_id: myLocParentObj.id,
                        parent_name: myLocParentObj.name,
                        ancestors: myLocAncestors,
                        notes: formData.locNotes
                    })
                        .success(function (data) {
                            vm.modal.close(data);
                            console.log("Success adding Location!");
                        })
                        .error(function (data) {
                            vm.formError = "Error adding Location: " + data;
                        })
                    .error(function (e) {
                        console.log(e);
                    });
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