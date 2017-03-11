(function(){
    "use strict";

    angular
        .module('photocollection.photos.collections.services')
        .factory('CollectionService', CollectionService);

    CollectionService.$inject = ['$http'];

    function CollectionService($http) {
        var CollectionService = {
            getAllCollections: getAllCollections,
        };
        return CollectionService;

        function getAllCollections() {
            console.log("hello")
            return $http.get('/collections/').then(function (response) {
                return response.data;
            })
        }

        return CollectionService;

    }
})();