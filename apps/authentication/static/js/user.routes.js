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
        }).otherwise({
            redirectTo: '/'
        });
    }
})();
