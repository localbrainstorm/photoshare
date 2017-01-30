(function () {
    'use strict';

    angular
        .module('photocollection.photos.upload', [
            'photocollection.photos.upload.controllers',
            'photocollection.photos.upload.services',
            'ngTagsInput'
        ]);

    angular
        .module('photocollection.photos.upload.controllers', []);

    angular
        .module('photocollection.photos.upload.services', ['ngCookies']);

})();

(function () {
    'use strict';

    angular
        .module('photocollection.photos.collections', [
            'photocollection.photos.collections.controllers',
            'photocollection.photos.collections.services'
        ]);

    angular
        .module('photocollection.photos.collections.controllers', []);

    angular
        .module('photocollection.photos.collections.services', []);
        
})();
