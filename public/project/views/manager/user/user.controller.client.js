(function(){
    angular
        .module("AdManager")
        .controller("ManagerUserListController", ManagerUserListController)
        .controller("ManagerNewUserController", ManagerNewUserController);

    function ManagerUserListController($routeParams, $route, UserService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUsersByManagerId(vm.managerId)
                .then(function(response) {
                    vm.users = response.data;
                });
        }

        init();

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(function(response) {
                    $route.reload();
                });
        }
    }

    function ManagerNewUserController($routeParams, $location, UserService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.createUser = createUser;

        function createUser(user) {
            user._manager = vm.managerId;
            
            UserService
                .register(user)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/user");
                });

        }
    }
})();