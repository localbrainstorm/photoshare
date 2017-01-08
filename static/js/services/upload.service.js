(function(){
	"use strict";

	angular
		.module('photocollection.photos.upload.services')
		.factory('UploadService', UploadService);

	UploadService.$inject = ['$http', 'Authentication', '$cookies'];

	function UploadService($http, Authentication, $cookies){
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
			return $http.post('/collection/', {
				'images_array': images_array,
				'user': Authentication.getAuthenticatedAccount()
			}).then(successFunction, errorFunction);
		}

		function successFunction(response){
			UploadService.storeCollection(response.data)
			window.location = '/collections';
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
			return $http.post('/collection/', {
				name: name,
				description: description,
				tags: tags,
				collection_id: collection_id
			}).then(successUpdateFunction, errorUpdateFunction);
		}

		function successUpdateFunction(response){
			console.log("successfully updated")
		}

		function errorUpdateFunction(){
			console.log("error on update")
		}

		function loadTags(){
			var promise = $http.get('/tags/').then(function (response) {
				console.log(response.data)
			});
			console.log(promise)
		}


	};

})();
