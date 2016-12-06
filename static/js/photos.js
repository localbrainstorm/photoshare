(function () {
    'use strict';

    angular.module('photocollection', [
        'photocollection.photos',
        'photocollection.user',
        'photocollection.layout',
    ]);

    angular
        .module('photocollection.photos', [
            'photocollection.photos.config',
            'photocollection.photos.routes'
        ]);

    angular
        .module('photocollection.photos.config', []);

    angular
        .module('photocollection.photos.routes', ['ngRoute']);
})();