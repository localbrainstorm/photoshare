(function () {
    'use strict';

    angular
        .module('photocollection.photos.collections.controllers')
        .controller('CollectionsController', CollectionsController);


    CollectionsController.$inject = ['$window', '$scope', 'CollectionService'];

    function CollectionsController($window, $scope, CollectionService) {
        var vm = this;
        console.log("what up")

        vm.getAllCollections = getAllCollections;

        function getAllCollections() {
            var promise = CollectionService.getAllCollections().then(function (response) {
                vm.allCollections = JSON.parse(response);
                console.log(vm.allCollections)
            });
        }
    }

})();
