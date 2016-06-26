(function(){
    angular
        .module("AdManager")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            loggedin: loggedin,
            logout: logout,
            register: register,
            findUserById: findUserById,
            findUsersByManagerId: findUsersByManagerId,
            findUsersByCampaignId: findUsersByCampaignId,
            findUsersBySearch: findUsersBySearch,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function login(user) {
            return $http.post("/api/user/login", user);
        }

        function loggedin() {
            return $http.get("/api/userloggedin");
        }

        function logout(user) {
            return $http.post("/api/user/logout");
        }

        function register(user) {
            return $http.post("/api/user/register", user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;

            return $http.get(url);
        }
        
        function findUsersByManagerId(managerId) {
            var url = "/api/user/manager/" + managerId;

            return $http.get(url);
        }

        function findUsersByCampaignId(campaignId) {
            var url = "/api/user/campaign/" + campaignId;

            return $http.get(url);
        }

        function findUsersBySearch(managerId, search) {
            var url = "/api/user/manager/" + managerId + "/search";
            search = {
                search: search
            };

            return $http.post(url, search);
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