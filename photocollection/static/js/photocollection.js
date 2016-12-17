(function () {
    'use strict';

    angular
        .module('photocollection', [
            'photocollection.user',
            'photocollection.layout',
            'photocollection.config',
            'photocollection.routes',
            'photocollection.photos'
        ]);

    angular
        .module('photocollection.config', []);

    angular
        .module('photocollection.routes', ['ngRoute']);

    angular
        .module('photocollection')
        .run(run);
        
    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();