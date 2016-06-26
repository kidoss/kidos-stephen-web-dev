(function(){
    angular
        .module("AdManager")
        .factory("ManagerService", ManagerService);

    function ManagerService($http) {
        var api = {
            login: login,
            loggedin: loggedin,
            logout: logout,
            register: register,
            findManagerById: findManagerById,
            updateManager: updateManager
        };
        return api;

        function login(manager) {
            return $http.post("/api/manager/login", manager);
        }

        function loggedin() {
            return $http.get("/api/managerloggedin");
        }

        function logout(manager) {
            return $http.post("/api/manager/logout");
        }

        function register(manager) {
            return $http.post("/api/manager/register", manager);
        }

        function findManagerById(managerId) {
            var url = "/api/manager/" + managerId;

            return $http.get(url);
        }

        function updateManager(managerId, manager) {
            var url = "/api/manager/" + managerId;

            return $http.put(url, manager);
        }
    }
})();