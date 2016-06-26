module.exports = function() {
    var mongoose = require('mongoose');
    var user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
    var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
    var host = process.env.OPENSHIFT_MONGODB_DB_HOST;
    var port = process.env.OPENSHIFT_MONGODB_DB_PORT;

    if(user && password && host && port) {
        mongoose.createConnection('mongodb://' + user + ':' + password + '@' + host + ':' + port + '/webdev');
    } else {
        mongoose.createConnection('mongodb://localhost/cs5610summer1');
    }

    var models = {
        userModel: require("./user/user.model.server")(),
        managerModel: require("./manager/manager.model.server")(),
        campaignModel: require("./campaign/campaign.model.server")(),
        adModel: require("./ad/ad.model.server")(),
        messageModel: require("./message/message.model.server.js")()
    };

    return models;
};