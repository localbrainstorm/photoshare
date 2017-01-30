(function () {
    'use strict';

    angular
        .module('photocollection.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication', '$location'];


    function NavbarController($scope, Authentication) {
        var vm = this;

        vm.logout = logout;
        vm.login = login;
        vm.register = register;
        vm.activate = activate;
        vm.photos = photos;

        function logout() {
            console.log('logging out')
            Authentication.logout();
        }

        function login() {
            window.location = '/login';
        }

        function register() {
            window.location = '/register';
        }

        function photos() {
            window.location = '/photos'
        }

        function activate() {
            console.log(Authentication.isAuthenticated())
            return Authentication.isAuthenticated();
        }
    }
})();
