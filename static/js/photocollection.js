(function () {
    'use strict';

    angular
        .module('photocollection', [
            'photocollection.user',
            'photocollection.layout'
        ]);

    angular
        .module('photocollection')
        .run(run);
        
    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();