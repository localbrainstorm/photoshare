(function() {
    'use strict';

    angular
        .module('user.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];
    function RegisterController($location, $scope, Authentication) {
        var vm = this;

        vm.register = register;

        function register() {
			  Authentication.register(vm.email, vm.first_name, vm.last_name, vm.password, vm.confirm_password);
        }
    }
})();
