(function () {
    'use strict';

    angular
        .module('photocollection.photos.photos.controllers')
        .controller('PhotosController', PhotosController);


    PhotosController.$inject = ['$window', '$scope', 'PhotoService'];

    function PhotosController($window, $scope, PhotoService) {
        var vm = this;

        vm.getAllCollections = getAllCollections;

        function getAllCollections() {
            var id = window.location.pathname.substring(11);
            console.log(id)
            PhotoService.getAllPhotosInCollection(id).then(function (response) {
                return response;
            })

        }

    }

})();