module.exports = function() {

    var mongoose = require("mongoose")
    var CampaignSchema = require("./campaign.schema.server")();
    var Campaign = mongoose.model("Campaign", CampaignSchema);

    var api = {
        createCampaign: createCampaign,
        findAllCampaignsForManagerId: findAllCampaignsForManagerId,
        findAllCampaignsForUserId: findAllCampaignsForUserId,
        findCampaignById: findCampaignById,
        updateCampaign: updateCampaign,
        deleteCampaign: deleteCampaign
    };
    return api;

    function createCampaign(managerId, campaign) {
        campaign._manager = managerId;
        return Campaign.create(campaign);
    }

    function findAllCampaignsForManagerId(managerId) {
        return Campaign.find({"_manager": managerId});
    }
    
    function findAllCampaignsForUserId(userId) {
        return Campaign.find({"users": userId});
    }

    function findCampaignById(campaignId) {
        return Campaign.findById(campaignId);
    }

    function updateCampaign(campaignId, campaign) {
        delete campaign._id;
        
        return Campaign
            .update({_id: campaignId},{
                $set: {
                    users: campaign.users,
                    ads: campaign.ads,
                    name: campaign.name,
                    description: campaign.description
                }
            });
    }

    function deleteCampaign(campaignId) {
        return Campaign.remove({_id: campaignId});
    }
};