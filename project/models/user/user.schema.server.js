module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        campaigns: [{type: mongoose.Schema.ObjectId, ref: "Campaign"}],
        messages: [{type: mongoose.Schema.ObjectId, ref: "Message"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};