module.exports = function() {
    var mongoose = require("mongoose");

    var ManagerSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        campaigns: [{type: mongoose.Schema.ObjectId, ref: "Campaign"}],
        messages: [{type: mongoose.Schema.ObjectId, ref: "Message"}],
        users: [{type: mongoose.Schema.ObjectId, ref: "User"}],
        dateCreated: {type: Date, default: Date.now},
        google: {
            id:    String,
            token: String
        }
    }, {collection: "project.manager"});

    return ManagerSchema;
};