(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            loggedin: loggedin,
            logout: logout,
            register: register,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function login(user) {
            return $http.post("/api/login", user);
        }

        function loggedin() {
            return $http.get("/api/loggedin");
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;

            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;

            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;

            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;

            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;

            return $http.delete(url);
        }
    }
})();