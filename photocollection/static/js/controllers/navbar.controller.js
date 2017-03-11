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
        vm.collections = collections;

        function logout() {
            Authentication.logout();
        }

        function login() {
            window.location = '/login';
        }

        function register() {
            window.location = '/register';
        }

        function photos() {
            window.location = '/photos';
        }

        function collections() {
            window.location = '/collections';
        }

        function activate() {
            return Authentication.isAuthenticated();
        }
    }
})();
