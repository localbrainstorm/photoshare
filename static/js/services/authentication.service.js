(function () {
    'use strict';

    angular
        .module('authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    function Authentication($cookies, $http) {
        var Authentication = {
            register: register
        };

        return Authentication;

        function register(email, password) {
            return $http.post('/accounts/', {
                email: email,
                password: password
            });
        }
    }

})();