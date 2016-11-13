(function () {
    'use strict';

    angular
        .module('user.routes', ['ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            // url relative to index
            templateUrl: '../static/templates/register.html'
        }).otherwise({
            redirectTo: '/'
        });
    }
})();