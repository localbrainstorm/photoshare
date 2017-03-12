(function () {
    'use strict';

    angular
        .module('photocollection.photos.photos.controllers')
        .controller('PhotosController', PhotosController);


    PhotosController.$inject = ['$window', '$scope', 'PhotoService'];

    function PhotosController($window, $scope, PhotoService) {
        var vm = this;

        vm.getAllCollections = getAllCollections;
        vm.imagePrefix = "https://s3-us-west-2.amazonaws.com/localbrainstormphotoshare/";

        function getAllCollections() {
            var id = window.location.pathname.substring(8);
            PhotoService.getAllPhotosInCollection(id).then(function (response) {
                    vm.allPhotosInCollection = response;
            })

        }

    }

})();