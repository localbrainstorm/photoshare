(function () {
    'use strict';

    angular
        .module('photocollection.user', [
            'photocollection.user.config',
            'photocollection.user.routes',
            'photocollection.user.authentication'
        ]);

    angular
        .module('photocollection.user.config', []);

    angular
        .module('photocollection.user.routes', ['ngRoute']);

        
// might be able to remove this bit since
// it's now in photocollection 
    // angular
    //     .module('photocollection.user')
    //     .run(run);
        
    // run.$inject = ['$http'];

    // function run($http) {
    //     $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    //     $http.defaults.xsrfCookieName = 'csrftoken';
    // }
})();