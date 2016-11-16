(function () {
    'use strict';

    angular
        .module('user.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    function Authentication($cookies, $http) {
        var Authentication = {
            register: register
        };

        return Authentication;

        function register(email, first_name, last_name, password, confirm_password) {
            return $http.post('/register', {
                email: email,
					 first_name: first_name,
					 last_name: last_name,
					 password: password,
					 confirm_password: confirm_password
            });
        }
    }

})();
