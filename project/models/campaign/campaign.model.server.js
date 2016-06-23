module.exports = function() {

    var mongoose = require("mongoose")
    var CampaignSchema = require("./campaign.schema.server")();
    var Campaign = mongoose.model("Campaign", CampaignSchema);

    var api = {

    };
    return api;

};