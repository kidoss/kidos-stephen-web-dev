(function(){
    angular
        .module("AdManager")
        .controller("UserLoginController", UserLoginController)
        .controller("UserProfileController", UserProfileController);

    function UserLoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;

        function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    });
        }
    }

    function UserProfileController($routeParams, $rootScope, $location, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.userId = $routeParams.uid;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                })
        }

        init();

        function updateUser(user) {
            UserService
                .updateUser(vm.userId, user)
                .then(function(response) {
                    vm.alert = "User updated";
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    });
        }
    }
})();