(function(){
    angular
        .module("AdManager")
        .controller("UserCampaignListController", UserCampaignListController);

    function UserCampaignListController($routeParams, CampaignService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            CampaignService
                .findCampaignsByUserId(vm.userId)
                .then(function(response) {
                    vm.campaigns = response.data;
                });
        }

        init();
    }
})();