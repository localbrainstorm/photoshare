(function(){
	"use strict";

	angular
		.module('photocollection.photos.upload.services')
		.factory('UploadService', UploadService);

	UploadService.$inject = ['$http', 'Authentication'];

	function UploadService($http, Authentication){
		var UploadService = {
			createCollection: createCollection,
			successFunction: successFunction,
			errorFunction: errorFunction,
		}


		return UploadService;

		function createCollection(images_array){
			console.log('images_array', images_array)
			console.log(Authentication.getAuthenticatedAccount());
			return $http.post('/collection/', {
				'images_array': images_array,
				'user': Authentication.getAuthenticatedAccount()
			}).then(successFunction, errorFunction);
		}

		function successFunction(){
			console.log('success');
		}

		function errorFunction(){
			console.log('error');
		}

	};

})();
