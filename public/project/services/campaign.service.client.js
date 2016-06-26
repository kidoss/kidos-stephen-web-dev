(function(){
    angular
        .module("AdManager")
        .factory("CampaignService", CampaignService);

    function CampaignService($http) {
        var api = {
            createCampaign: createCampaign,
            findCampaignsByManagerId: findCampaignsByManagerId,
            findCampaignsByUserId: findCampaignsByUserId,
            findCampaignById: findCampaignById,
            updateCampaign: updateCampaign,
            deleteCampaign: deleteCampaign
        };
        return api;

        function createCampaign(managerId, campaign) {
            var url = "/api/manager/" + managerId + "/campaign";

            return $http.post(url, campaign);
        }

        function findCampaignsByManagerId(managerId) {
            var url = "/api/manager/" + managerId + "/campaign";

            return $http.get(url);
        }

        function findCampaignsByUserId(userId) {
            var url = "/api/user/" + userId + "/campaign";

            return $http.get(url);
        }

        function findCampaignById(campaignId) {
            var url = "/api/campaign/" + campaignId;

            return $http.get(url);
        }

        function updateCampaign(campaignId, campaign) {
            var url = "/api/campaign/" + campaignId;

            return $http.put(url, campaign);
        }

        function deleteCampaign(campaignId) {
            var url = "/api/campaign/" + campaignId;

            return $http.delete(url);
        }
    }
})();