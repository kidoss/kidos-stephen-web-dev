(function(){
    angular
        .module("AdManager")
        .controller("UserMessageListController", UserMessageListController)
        .controller("UserNewMessageController", UserNewMessageController);

    function UserMessageListController($routeParams, $route, MessageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.deleteMessage = deleteMessage;

        function init() {
            MessageService
                .findMessagesByToId(vm.userId)
                .then(function(response) {
                    vm.messages = response.data;
                    console.log(vm.messages);
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

    function UserNewMessageController($routeParams, $location, MessageService, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createMessage = createMessage;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();

        function createMessage(message) {
            message.to = vm.user._manager;
            message.from = vm.user.username;
            
            MessageService
                .createMessage(vm.userId, message)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/message");
                });

        }
    }
})();