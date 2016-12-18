(function(){
	"use strict";

	angular
		.module('photocollection.photos.upload.services')
		.factory('UploadService', UploadService);

	Upload.$inject = ['$http'];

	function UploadService($http){
		var UploadService = {
			createCollection: createCollection,
			successFunction: successFunction,
			errorFunction: errorFunction,
		}


		return UploadService;

		function createCollection(images_array){
			return $http.post('/collection/', {
				images_array: images_array
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
