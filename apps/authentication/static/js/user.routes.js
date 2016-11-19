(function () {
    'use strict';

    angular
        .module('user.routes', ['ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            // url relative to index
            templateUrl: '../static/partials/register.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '../static/partials/login.html'
        }).otherwise({
            redirectTo: '/'
        });
    }
})();
