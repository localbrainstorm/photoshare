(function () {
    'use strict';

    angular
        .module('user', [
            'user.config',
            'user.routes',
            'user.authentication'
        ])
        .run(run);

    angular
        .module('user.config', []);

    angular
        .module('user.routes', ['$ngRoute']);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();