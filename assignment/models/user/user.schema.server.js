module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.ObjectId, ref: "Website"}],
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "assignment.user"});

    return UserSchema;
};