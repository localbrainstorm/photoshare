(function () {
    'use strict';

    angular
        .module('photocollection.photos.collections.controllers')
        .controller('CollectionsController', CollectionsController);


    CollectionsController.$inject = ['$window', '$scope', 'CollectionService'];

    function CollectionsController($window, $scope, CollectionService) {
        var vm = this;

        vm.getAllCollections = getAllCollections;

        function getAllCollections() {
            vm.allCollections = CollectionService.getAllCollections();
            console.log(vm.allCollections)
        }
    }

})();
