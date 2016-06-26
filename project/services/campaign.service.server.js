module.exports = function(app, models) {

    var campaignModel = models.campaignModel;
    var userModel = models.userModel;

    app.post("/api/manager/:managerId/campaign", createCampaign);
    app.get("/api/manager/:managerId/campaign", findAllCampaignsForManagerId);
    app.get("/api/user/:userId/campaign", findAllCampaignsForUserId);
    app.get("/api/campaign/:campaignId", findCampaignById);
    app.put("/api/campaign/:campaignId", updateCampaign);
    app.delete("/api/campaign/:campaignId", deleteCampaign);

    function createCampaign(req, res) {
        var id = req.params.managerId;
        var campaign = req.body;

        campaignModel
            .createCampaign(id, campaign)
            .then(function(campaign) {
                res.json(campaign);
            })
    }

    function findAllCampaignsForManagerId(req, res) {
        var id = req.params.managerId;

        campaignModel
            .findAllCampaignsForManagerId(id)
            .then(function(campaigns) {
                res.json(campaigns);
            })
    }

    function findAllCampaignsForUserId(req, res) {
        var id = req.params.userId;

        campaignModel
            .findAllCampaignsForUserId(id)
            .then(function(campaigns) {
                res.json(campaigns);
            })
    }

    function findCampaignById(req, res) {
        var id = req.params.campaignId;

        campaignModel
            .findCampaignById(id)
            .then(function(campaign) {
                res.json(campaign);
            })
    }

    function updateCampaign(req, res) {
        var id = req.params.campaignId;
        var campaign = req.body;

        campaignModel
            .updateCampaign(id, campaign)
            .then(function(campaign) {
                res.json(campaign);
            })
    }

    function deleteCampaign(req, res) {
        var id = req.params.campaignId;

        campaignModel
            .deleteCampaign(id)
            .then(function(campaign) {
                res.json(campaign);
            })
    }
}