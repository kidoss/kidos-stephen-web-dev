module.exports = function() {

    var mongoose = require("mongoose")
    var AdSchema = require("./ad.schema.server")();
    var Ad = mongoose.model("Ad", AdSchema);

    var api = {
        createAd: createAd,
        findAllAdsForCampaign: findAllAdsForCampaign,
        findAdById: findAdById,
        updateAd: updateAd,
        deleteAd: deleteAd
    };
    return api;

    function createAd(campaignId, ad) {
        ad._campaign = campaignId;
        return Ad.create(ad);
    }

    function findAllAdsForCampaign(campaignId) {
        return Ad.find({"_campaign": campaignId});
    }

    function findAdById(adId) {
        return Ad.findById(adId);
    }

    function updateAd(adId, ad) {
        delete ad._id;
        return Ad
            .update({_id: adId},{
                $set: {
                    name: ad.name,
                    description: ad.description,
                    url: ad.url,
                    ageMin: ad.ageMin,
                    ageMax: ad.ageMax,
                    gender: ad.gender,
                    area: ad.area
                }
            });
    }

    function deleteAd(adId) {
        return Ad.remove({_id: adId});
    }
};