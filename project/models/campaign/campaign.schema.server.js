module.exports = function() {
    var mongoose = require("mongoose");

    var CampaignSchema = mongoose.Schema({
        _manager: {type: mongoose.Schema.ObjectId, ref: "Manager"},
        users: [{type: mongoose.Schema.ObjectId, ref: "User"}],
        ads: [{type: mongoose.Schema.ObjectId, ref: "Ad"}],
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.campaign"});

    return CampaignSchema;
};