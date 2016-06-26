(function() {
    angular
        .module("AdManager")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.view.client.html"
            })
            .when("/manager/login", {
                templateUrl: "views/manager/login.view.client.html",
                controller: "ManagerLoginController",
                controllerAs: "model"
            })
            .when("/manager/register", {
                templateUrl: "views/manager/register.view.client.html",
                controller: "ManagerRegisterController",
                controllerAs: "model"
            })
            .when("/manager/:mid", {
                templateUrl: "views/manager/profile.view.client.html",
                controller: "ManagerProfileController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign", {
                templateUrl: "views/manager/campaign/campaign-list.view.client.html",
                controller: "ManagerCampaignListController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign/new", {
                templateUrl: "views/manager/campaign/campaign-new.view.client.html",
                controller: "ManagerNewCampaignController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign/:cid", {
                templateUrl: "views/manager/campaign/campaign-edit.view.client.html",
                controller: "ManagerEditCampaignController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign/:cid/user", {
                templateUrl: "views/manager/campaign/campaign-user.view.client.html",
                controller: "ManagerEditCampaignController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign/:cid/ad", {
                templateUrl: "views/manager/ad/ad-list.view.client.html",
                controller: "ManagerAdListController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign/:cid/ad/new", {
                templateUrl: "views/manager/ad/ad-new.view.client.html",
                controller: "ManagerNewAdController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/campaign/:cid/ad/:aid", {
                templateUrl: "views/manager/ad/ad-edit.view.client.html",
                controller: "ManagerEditAdController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/user", {
                templateUrl: "views/manager/user/user-list.view.client.html",
                controller: "ManagerUserListController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/user/new", {
                templateUrl: "views/manager/user/user-new.view.client.html",
                controller: "ManagerNewUserController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/message", {
                templateUrl: "views/manager/message/message-list.view.client.html",
                controller: "ManagerMessageListController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/message/new", {
                templateUrl: "views/manager/message/message-users.view.client.html",
                controller: "ManagerNewMessageController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/manager/:mid/message/new/:uid", {
                templateUrl: "views/manager/message/message-new.view.client.html",
                controller: "ManagerNewMessageController",
                controllerAs: "model",
                resolve: { loggedin: managerCheckLoggedIn }
            })
            .when("/user/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "UserLoginController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .when("/user/:uid/campaign", {
                templateUrl: "views/user/campaign/campaign-list.view.client.html",
                controller: "UserCampaignListController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .when("/user/:uid/campaign/:cid/ad", {
                templateUrl: "views/user/ad/ad-list.view.client.html",
                controller: "UserAdListController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .when("/user/:uid/campaign/:cid/ad/new", {
                templateUrl: "views/user/ad/ad-new.view.client.html",
                controller: "UserNewAdController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .when("/user/:uid/campaign/:cid/ad/:aid", {
                templateUrl: "views/user/ad/ad-edit.view.client.html",
                controller: "UserEditAdController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .when("/user/:uid/message", {
                templateUrl: "views/user/message/message-list.view.client.html",
                controller: "UserMessageListController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .when("/user/:uid/message/new", {
                templateUrl: "views/user/message/message-new.view.client.html",
                controller: "UserNewMessageController",
                controllerAs: "model",
                resolve: { loggedin: userCheckLoggedIn }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function managerCheckLoggedIn(ManagerService, $location, $q, $rootScope) {
            var deferred = $q.defer();

            ManagerService
                .loggedin()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/manager/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $location.url("/manager/login");
                    }
                );

            return deferred.promise;
        }

        function userCheckLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedin()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/user/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $location.url("/user/login");
                    }
                );

            return deferred.promise;
        }
    }
})();