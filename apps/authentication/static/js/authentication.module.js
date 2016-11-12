(function () {
    'use strict';

    angular
        .module('authentication', [
            'authentication.controllers',
            'authentication.services',
            'authentication.routes',
            'authentication.config'
        ]);

    angular
        .module('authentication.controllers', []);

    angular
        .module('authentication.services', ['ngCookies']);

    angular
        .module('authentication.routes', ['ngRoute']);

    angular
        .module('authentication.config', []);

    angular
        .module('authentication')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();