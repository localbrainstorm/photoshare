(function () {
    'use strict';

    angular
        .module('photocollection.photos.routes', ['ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        console.log('ROUTES')
        $routeProvider.when('/photos', {
            templateUrl: '../static/partials/gallery.html',
            controller: 'UploadController',
            controllerAs: 'vm'
        });
    }
})