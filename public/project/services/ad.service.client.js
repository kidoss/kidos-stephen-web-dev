(function(){
    angular
        .module("AdManager")
        .factory("AdService", AdService);

    function AdService($http) {
        var api = {
            createAd: createAd,
            findAdsByCampaignId: findAdsByCampaignId,
            findAdById: findAdById,
            updateAd: updateAd,
            deleteAd: deleteAd,
            upload: upload
        };
        return api;

        function createAd(campaignId, ad) {
            var url = "/api/campaign/" + campaignId + "/ad";

            return $http.post(url, ad);
        }

        function findAdsByCampaignId(campaignId) {
            var url = "/api/campaign/" + campaignId + "/ad";

            return $http.get(url);
        }

        function findAdById(adId) {
            var url = "/api/ad/" + adId;

            return $http.get(url);
        }

        function updateAd(adId, ad) {
            var url = "/api/ad/" + adId;

            return $http.put(url, ad);
        }

        function deleteAd(adId) {
            var url = "/api/ad/" + adId;

            return $http.delete(url);
        }
        
        function upload(image) {
            return $http.post("/api/upload", image);
        }
    }
})();