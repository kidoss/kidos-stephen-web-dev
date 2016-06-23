module.exports = function() {
    var mongoose = require("mongoose");

    var AdSchema = mongoose.Schema({
        _campaign: {type: mongoose.Schema.ObjectId, ref: "Campaign"},
        name: String,
        description: String,
        url: String,
        ageMin: Number,
        ageMax: Number,
        gender: {type: String, enum: ['MALE', 'FEMALE', 'BOTH']},
        area: {type: String, enum: ['URBAN', 'SUBURBAN', 'RURAL', 'ALL']},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.ad"});

    return AdSchema;
};