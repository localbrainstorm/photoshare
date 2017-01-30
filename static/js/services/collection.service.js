(function(){
    "use strict";

    angular
        .module('photocollection.photos.collections.services')
        .factory('CollectionService', CollectionService);

    CollectionService.$inject = ['$http'];

    function CollectionService($http) {

        function getAllCollections() {
            $http.get('/collections/').then(function(err, response) {
                console.log(response);
                return response;
            })
        }

        return CollectionService;

    }
})();