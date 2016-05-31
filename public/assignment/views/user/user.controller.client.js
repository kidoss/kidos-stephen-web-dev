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
            user = UserService.findUserByCredentials(user.username, user.password);

            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
            UserService.createUser(user);
            user = UserService.findUserByCredentials(user.username, user.password);
            $location.url("/user/" + user._id);
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function updateUser(user) {
            UserService.updateUser(id, user);
        }
    }
})();