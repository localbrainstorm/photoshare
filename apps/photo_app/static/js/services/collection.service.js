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
            $http.get('/collections/').then(function(err, response) {
                console.log(err)
                console.log(response);
                return response;
            })
        }

        return CollectionService;

    }
})();