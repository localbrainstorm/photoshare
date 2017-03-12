(function(){
    "use strict";

    angular
        .module('photocollection.photos.photos.services')
        .factory('PhotoService', PhotoService);

    PhotoService.$inject = ['$http'];

    function PhotoService($http) {
        var PhotoService = {
            getAllPhotosInCollection: getAllPhotosInCollection
        };
        return PhotoService;

        function getAllPhotosInCollection(id) {
            return $http.get('/collections/photos/' + id).then(function (response) {
                return response.data;
            })
        }
    }
})();