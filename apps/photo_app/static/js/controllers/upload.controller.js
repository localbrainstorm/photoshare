(function () {
    'use strict';

    angular
        .module('photocollection.photos.upload.controllers')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$window', '$scope'];


    function UploadController($window, $scope) {
        var vm = this;

        vm.continueUpload = continueUpload;
        vm.selectedImages = false;

        function continueUpload() {
            vm.images_array = $window.images_array;
            //we need to add in an error if images array length is less than 1
            console.log("in upload controller")
            console.log(vm.images_array)
        }
    }
})();