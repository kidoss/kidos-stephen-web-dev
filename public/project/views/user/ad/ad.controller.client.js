(function(){
    angular
        .module("AdManager")
        .controller("UserAdListController", UserAdListController)
        .controller("UserNewAdController", UserNewAdController)
        .controller("UserEditAdController", UserEditAdController);

    function UserAdListController($routeParams, AdService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.campaignId = $routeParams.cid;

        function init() {
            AdService
                .findAdsByCampaignId(vm.campaignId)
                .then(function(response) {
                    vm.ads = response.data;
                });
        }

        init();
    }

    function UserNewAdController($routeParams, $location, AdService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.campaignId = $routeParams.cid;
        vm.createAd = createAd;

        function createAd(ad) {
            AdService
                .createAd(vm.campaignId, ad)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/campaign/" + vm.campaignId + "/ad");
                });

        }
    }

    function UserEditAdController($routeParams, $location, AdService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.campaignId = $routeParams.cid;
        vm.adId = $routeParams.aid;
        vm.updateAd = updateAd;
        vm.deleteAd = deleteAd;

        function init() {
            AdService
                .findAdById(vm.adId)
                .then(function(response) {
                    vm.ad = response.data;
                });
        }

        init();

        function updateAd(ad) {
            AdService
                .updateAd(vm.adId, ad)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/campaign/" + vm.campaignId + "/ad");
                });
        }

        function deleteAd() {
            AdService
                .deleteAd(vm.adId)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/campaign/" + vm.campaignId + "/ad");
                });
        }
    }
})();