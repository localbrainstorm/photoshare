(function () {
    'use strict';

    angular
        .module('photocollection.routes', ['ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            // url relative to index
            templateUrl: '../static/partials/splash.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '../static/partials/login.html'
        }).when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '../static/partials/register.html'
        }).when('/photos', {
            controller: 'UploadController',
            controllerAs: 'vm',
            templateUrl: '../static/partials/gallery.html',
        }).when('/postCollection', {
            controller: 'UploadController',
            controllerAs: 'vm',
            templateUrl: '../static/partials/addImagesPtTwo.html'
        }).when('/collections', {
            controller: 'CollectionsController',
            controllerAs: 'vm',
            templateUrl: '../static/partials/collections.html'
        });
    }
})();