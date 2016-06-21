module.exports = function() {
    var mongoose = require('mongoose');
    var user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
    var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
    var host = process.env.OPENSHIFT_MONGODB_DB_HOST;
    var port = process.env.OPENSHIFT_MONGODB_DB_PORT;
    //mongoose.createConnection('mongodb://localhost/cs5610summer1');
    mongoose.createConnection('mongodb://' + user + ':' + password + '@' + host + ':' + port + '/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };
    
    return models;
};