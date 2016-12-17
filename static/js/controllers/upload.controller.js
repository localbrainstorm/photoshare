(function () {
    'use strict';

    angular
        .module('photocollection.photos.upload.controllers')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$window', '$scope'];


    function UploadController($window, $scope) {
        var vm = this;

        vm.continueUpload = continueUpload;

        function continueUpload() {
            vm.images = $window.images;
            console.log("in upload controller")
            console.log(vm.images)
        }
    }
})();