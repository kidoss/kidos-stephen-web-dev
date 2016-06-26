(function(){
    angular
        .module("AdManager")
        .controller("ManagerMessageListController", ManagerMessageListController)
        .controller("ManagerNewMessageController", ManagerNewMessageController);

    function ManagerMessageListController($routeParams, $route, MessageService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.deleteMessage = deleteMessage;

        function init() {
            MessageService
                .findMessagesByToId(vm.managerId)
                .then(function(response) {
                    vm.messages = response.data;
                });
        }
        init();

        function deleteMessage(messageId) {
            MessageService
                .deleteMessage(messageId)
                .then(function(response) {
                    $route.reload();
                });
        }
    }

    function ManagerNewMessageController($routeParams, $location, $rootScope, MessageService, ManagerService, UserService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.userId = $routeParams.uid;
        vm.searchUsers = searchUsers;
        vm.createMessage = createMessage;

        function init() {
            ManagerService
                .findManagerById(vm.managerId)
                .then(function(response) {
                    vm.manager = response.data;
                })
            UserService
                .findUsersByManagerId(vm.managerId)
                .then(function(response) {
                    vm.users = response.data;
                });

            if(vm.userId) {
                UserService
                    .findUserById(vm.userId)
                    .then(function(response) {
                        vm.user = response.data;
                    });
            }
        }
        init();

        function searchUsers(search) {
            UserService
                .findUsersBySearch(vm.managerId, search)
                .then(function(response) {
                    vm.users = response.data;
                })
        }

        function createMessage(message) {
            message.to = vm.user._id;
            message.from = vm.manager.username;

            MessageService
                .createMessage(vm.managerId, message)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/message");
                });

        }
    }
})();