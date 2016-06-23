module.exports = function() {

    var mongoose = require("mongoose")
    var MessageSchema = require("./message.schema.server")();
    var Message = mongoose.model("Message", MessageSchema);

    var api = {

    };
    return api;

};