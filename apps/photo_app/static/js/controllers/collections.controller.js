(function () {
    'use strict';

    angular
        .module('photocollection.photos.collections.controllers')
        .controller('CollectionsController', CollectionsController);


    CollectionsController.$inject = ['$window', '$scope', 'CollectionService'];

    function CollectionsController($window, $scope, CollectionService) {
        var vm = this;

        vm.getAllCollections = getAllCollections;
        vm.imagePrefix = "https://s3-us-west-2.amazonaws.com/localbrainstormphotoshare/";
        vm.loadPhotosWithId = loadPhotosWithId;

        function getAllCollections() {
            var promise = CollectionService.getAllCollections().then(function (response) {
                vm.allCollections = response;
            });
        }

        function loadPhotosWithId(id) {
            window.location = '/photos/' + id
        }
    }

})();