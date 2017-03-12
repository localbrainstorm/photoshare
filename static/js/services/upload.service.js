(function(){
	"use strict";

	angular
		.module('photocollection.photos.upload.services')
		.factory('UploadService', UploadService);

	UploadService.$inject = ['$http', 'Authentication', '$cookies', '$window'];

	function UploadService($http, Authentication, $cookies, $window){
		var UploadService = {
			createCollection: createCollection,
			successFunction: successFunction,
			errorFunction: errorFunction,
			storeCollection: storeCollection,
			getCollection: getCollection,
			addCollectionData: addCollectionData,
			successUpdateFunction:successUpdateFunction,
			errorUpdateFunction:errorUpdateFunction,
			loadTags: loadTags,
		}


		return UploadService;

		function createCollection(images_array){
			return $http.post('/collections/', {
				'images_array': images_array,
				'user': Authentication.getAuthenticatedAccount()
			}).then(successFunction, errorFunction);
		}

		function successFunction(response){
			UploadService.storeCollection(response.data)
			window.location = '/postCollection/';
		}

		function errorFunction(){
			console.log('error');
		}

		function storeCollection(data){
			$cookies.putObject('images', data)
		}

		function getCollection(){
			return JSON.parse($cookies.get('images'))
		}

		function addCollectionData(name, description, tags, collection_id){
			return $http.post('/collections/', {
				name: name,
				description: description,
				tags: tags,
				collection_id: collection_id
			}).then(successUpdateFunction, errorUpdateFunction);
		}

		function successUpdateFunction(response){
			window.location = '/collections';
		}

		function errorUpdateFunction(){
			console.log("error on update")
		}

		function loadTags(){
			return $http.get('/tags/').then(function (response) {
				return response.data
			});
		}


	};

})();
