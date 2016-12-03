(function () {
    'use strict';

    angular
        .module('photocollection.user.authentication', [
            'photocollection.user.authentication.controllers',
            'photocollection.user.authentication.services'
        ]);

    angular
        .module('photocollection.user.authentication.controllers', []);

    angular
        .module('photocollection.user.authentication.services', ['ngCookies']);
})();