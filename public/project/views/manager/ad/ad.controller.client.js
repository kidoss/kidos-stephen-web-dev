(function(){
    angular
        .module("AdManager")
        .controller("ManagerAdListController", ManagerAdListController)
        .controller("ManagerNewAdController", ManagerNewAdController)
        .controller("ManagerEditAdController", ManagerEditAdController);

    function ManagerAdListController($routeParams, AdService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
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

    function ManagerNewAdController($routeParams, $location, $scope, AdService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.campaignId = $routeParams.cid;
        vm.createAd = createAd;

        function createAd(ad, upload) {
            if(ad.upload) {
                adService
                    .upload(ad.upload)
                    .then(function(response) {
                        delete ad.upload;
                        ad.url = response.data;

                        AdService
                            .createAd(vm.campaignId, ad)
                            .then(function (response) {
                                $location.url("/manager/" + vm.managerId + "/campaign/" + vm.campaignId + "/ad");
                            });
                    });
            } else {
                delete ad.upload;

                AdService
                    .createAd(vm.campaignId, ad)
                    .then(function (response) {
                        $location.url("/manager/" + vm.managerId + "/campaign/" + vm.campaignId + "/ad");
                    });
            }

        }
    }

    function ManagerEditAdController($routeParams, $location, AdService) {
        var vm = this;
        vm.managerId = $routeParams.mid;
        vm.campaignId = $routeParams.cid;
        vm.adId = $routeParams.aid;
        vm.updateAd = updateAd;
        vm.deleteAd = deleteAd;

        function init() {
            AdService
                .findAdById(vm.adId)
                .then(function(response) {
                    vm.ad = response.data;
                    console.log(vm.ad);
                });
        }

        init();

        function updateAd(ad) {
            AdService
                .updateAd(vm.adId, ad)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/campaign/" + vm.campaignId + "/ad");
                });
        }

        function deleteAd() {
            AdService
                .deleteAd(vm.adId)
                .then(function(response) {
                    $location.url("/manager/" + vm.managerId + "/campaign/" + vm.campaignId + "/ad");
                });
        }
    }
})();