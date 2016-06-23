module.exports = function() {

    var mongoose = require("mongoose")
    var ManagerSchema = require("./manager.schema.server")();
    var Manager = mongoose.model("Manager", ManagerSchema);

    var api = {

    };
    return api;

};