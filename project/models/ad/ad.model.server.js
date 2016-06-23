module.exports = function() {

    var mongoose = require("mongoose")
    var AdSchema = require("./ad.schema.server")();
    var Ad = mongoose.model("Ad", AdSchema);

    var api = {

    };
    return api;

};