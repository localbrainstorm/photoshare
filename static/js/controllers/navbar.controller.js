(function () {
    'use strict';

    angular
        .module('photocollection.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];


    function NavbarController($scope, Authentication) {
        var vm = this;

        vm.logout = logout;
        vm.login = login;
        vm.register = register;
        vm.activate = activate;
        vm.photos = photos;
        vm.collections = collections;
        vm.clicked = false;
        vm.openMenuOptions = openMenuOptions;
        vm.openLeftMenu = openLeftMenu;

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

        function openMenuOptions() {
            $('.menu-options').toggle("slow")

        }

        function openLeftMenu() {
            $mdSidenav('left').toggle();
        };
    }
})();
