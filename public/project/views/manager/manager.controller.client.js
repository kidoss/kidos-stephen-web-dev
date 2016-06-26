(function(){
    angular
        .module("AdManager")
        .controller("ManagerLoginController", ManagerLoginController)
        .controller("ManagerRegisterController", ManagerRegisterController)
        .controller("ManagerProfileController", ManagerProfileController);

    function ManagerLoginController($location, $rootScope, ManagerService) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;

        function login(manager) {
            ManagerService
                .login(manager)
                .then(
                    function(response) {
                        var manager = response.data;
                        $rootScope.currentUser = manager;
                        $location.url("/manager/" + manager._id);
                    });
        }

        function logout() {
            ManagerService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    });
        }
    }

    function ManagerRegisterController($location, $rootScope, ManagerService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
            var manager = {
                username: username,
                password: password
            }

            ManagerService
                .register(manager)
                .then(
                    function(response) {
                        var manager = response.data;
                        $rootScope.currentUser = manager;
                        $location.url("/manager/" + manager._id);
                    });
        }
    }

    function ManagerProfileController($routeParams, $rootScope, $location, ManagerService) {
        var vm = this;
        vm.updateManager = updateManager;
        vm.logout = logout;
        vm.managerId = $routeParams.mid;

        function init() {
            ManagerService
                .findManagerById(vm.managerId)
                .then(function(response) {
                    vm.manager = response.data;
                })
        }

        init();

        function updateManager(manager) {
            ManagerService
                .updateManager(vm.managerId, manager)
                .then(function(response) {
                    vm.alert = "User updated";
                });
        }

        function logout() {
            ManagerService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    });
        }
    }
})();