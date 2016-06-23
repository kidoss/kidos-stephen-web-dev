module.exports = function() {
    var mongoose = require("mongoose");

    var MessageSchema = mongoose.Schema({
        to: String,
        from: String,
        title: String,
        message: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.message"});

    return MessageSchema;
};