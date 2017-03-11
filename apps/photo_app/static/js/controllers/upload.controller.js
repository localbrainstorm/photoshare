(function () {
    'use strict';

    angular
        .module('photocollection.photos.upload.controllers')
        .controller('UploadController', UploadController);


    UploadController.$inject = ['$window', '$scope', 'UploadService'];


    function UploadController($window, $scope, UploadService) {
        var vm = this;

        vm.continueUpload = continueUpload;
        vm.formatCollectionLink = formatCollectionLink;
        vm.selectedImages = false;
        vm.addCollectionData = addCollectionData;
        vm.loadTags = loadTags;
        vm.addToTags = addToTags;
        vm.collectionTags = [];

        function continueUpload() {
            vm.images_array = $window.images_array;
            //we need to add in an error if images array length is less than 1
						if (vm.images_array.length < 1) {
							vm.error = {
								'message': "failed to upload!"
							}
						} else {
							UploadService.createCollection(vm.images_array);
						}
        }

        function formatCollectionLink() {
            vm.collection_data = UploadService.getCollection()
            var thumb = vm.collection_data.images_array[0]
            // console.log(thumb)
            vm.thumb_link = "https://s3-us-west-2.amazonaws.com/localbrainstormphotoshare/" + thumb + ".jpg"
            vm.number_of_images = vm.collection_data.images_array.length
            //get image preview from aws
        }

        function loadTags(){
            var promise = UploadService.loadTags().then(function (response) {
                vm.existingTags = response;
            })
        }

        function addCollectionData(){
            var collection_id = vm.collection_data.collection
            UploadService.addCollectionData(vm.name, vm.description, vm.collectionTags, collection_id)
        }

        function addToTags(tag){
            vm.collectionTags.push({"text":tag.name, "id":tag.id})
        }
    }
})();
