(function(){
    angular
        .module("AdManager")
        .controller("ManagerCampaignListController", ManagerCampaignListController)
        .controller("ManagerNewCampaignController", ManagerNewCampaignController)
        .controller("ManagerEditCampaignController", ManagerEditCampaignController);

    function ManagerCampaignListController($routeParams, CampaignService) {
        var vm = this;
        vm.managerId = $routeParams.mid;

        function init() {
            CampaignService
                .findCampaignsByManagerId(vm.managerId)
                .then(function(response) {
                    vm.campaigns = response.data;
                });
        }

        init();
    }

    function ManagerNewCampaignController($routeParams, $location, CampaignService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.createCampaign = createCampaign;

        function createCampaign(campaign) {
            CampaignService
                .createCampaign(vm.managerId, campaign)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/campaign");
                });

        }
    }

    function ManagerEditCampaignController($routeParams, $location, $route, CampaignService, UserService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.campaignId = $routeParams.cid;
        vm.updateCampaign = updateCampaign;
        vm.addCampaignUser = addCampaignUser;
        vm.searchUsers = searchUsers;
        vm.deleteCampaign = deleteCampaign;

        function init() {
            CampaignService
                .findCampaignById(vm.campaignId)
                .then(function(response) {
                    vm.campaign = response.data;
                });

            UserService
                .findUsersByManagerId(vm.managerId)
                .then(function(response) {
                    vm.users = response.data;
                })

            UserService
                .findUsersByCampaignId(vm.campaignId)
                .then(function(response) {
                    vm.campaignUsers = response.data;
                })
        }

        init();

        function updateCampaign(campaign) {
            CampaignService
                .updateCampaign(vm.campaignId, campaign)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/campaign");
                });

        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/campaign/" + vm.campaign._id);
                });
        }

        function addCampaignUser(user) {
            console.log(vm.campaign.users.indexOf(user._id));
            if(vm.campaign.users.indexOf(user._id) < 0) {
                vm.campaign.users.push(user._id);
                user.campaigns.push(vm.campaign._id);

                updateCampaign(vm.campaign);
                updateUser(user);
            }

            $location.url("/manager/" + vm.managerId + "/campaign/" + vm.campaign._id);
        }

        function searchUsers(search) {
            UserService
                .findUsersBySearch(vm.managerId, search)
                .then(function(response) {
                    vm.users = response.data;
                })
        }

        function deleteCampaign() {
            CampaignService
                .deleteCampaign(vm.campaignId)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/campaign");
                });
        }
    }
})();