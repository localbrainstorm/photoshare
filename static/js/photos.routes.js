(function () {
    'use strict';

    angular
        .module('photocollection.photos.routes', ['ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        console.log('route config')
        $routeProvider.when('/photos', {
            templateUrl: '../static/partials/gallery.html'
        });
    }
})