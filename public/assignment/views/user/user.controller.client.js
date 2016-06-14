(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    vm.user = response.data;

                    if(vm.user) {
                        $location.url("/user/" + vm.user._id);
                    } else {
                        vm.alert = "Unable to login";
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password) {
            UserService
                .createUser(username, password)
                .then(function(response) {
                    vm.user = response.data;

                    if(vm.user) {
                        $location.url("/user/" + vm.user._id);
                    } else {
                        vm.alert = "Unable to create user";
                    }
                });
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
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
    }
})();