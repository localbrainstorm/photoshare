(function () {
    'use strict';

    angular
        .module('user.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    function Authentication($cookies, $http) {
        var Authentication = {
            register: register,
            login: login,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };

        return Authentication;

        function register(email, first_name, last_name, password, confirm_password) {
            // trailing slash is necessary when using SimpleRouter
            return $http.post('/register/', {
                email: email,
                first_name: first_name,
				last_name: last_name,
				password: password,
				confirm_password: confirm_password
            }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            }

            function registerErrorFn(data, status, headers, config) {
                console.error("Registration failure");
            }
        }

        function login(email, password) {
            return $http.post('/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);
                window.location = '/';
            }

            function loginErrorFn(data, status, headers, config) {
                console.error("No good!");
            }
        }

        // begin Session aka cookie control. This means users will need to have cookies enabled to use application. We should probably add a caveat somewhere to that extent.
        function getAuthenticatedAccount() {
            if(!$cookies.authenticatedAccount) {
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            // return the boolean value of the authenticated Account cookie
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
    }

})();
