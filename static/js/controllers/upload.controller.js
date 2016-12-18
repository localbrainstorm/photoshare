(function () {
    'use strict';

    angular
        .module('photocollection.photos.upload.controllers')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$window', '$scope', 'UploadService'];


    function UploadController($window, $scope, UploadService) {
        var vm = this;

        vm.continueUpload = continueUpload;
        vm.selectedImages = false;

        function continueUpload() {
            vm.images_array = $window.images_array;
            //we need to add in an error if images array length is less than 1
						if (!vm.images_array || vm.images_array.length) {
							vm.error = {
								'message': "failed to upload!"
							}
							console.log('we have no images');
						} else {
							console.log('calling factory');
							Upload.createCollection(vm.images_array);
						}
        }
    }
})();
