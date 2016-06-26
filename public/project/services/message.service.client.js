(function(){
    angular
        .module("AdManager")
        .factory("MessageService", MessageService);

    function MessageService($http) {
        var api = {
            createMessage: createMessage,
            findMessagesByToId: findMessagesByToId,
            deleteMessage: deleteMessage
        };
        return api;

        function createMessage(fromId, message) {
            var url = "/api/message/";

            return $http.post(url, message);
        }

        function findMessagesByToId(toId) {
            var url = "/api/message/" + toId;

            return $http.get(url);
        }

        function deleteMessage(messageId) {
            var url = "/api/message/" + messageId;

            return $http.delete(url);
        }
    }
})();