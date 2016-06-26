module.exports = function(app) {
    var models = require("./models/models.server")();

    require("./services/ad.service.server.js")(app, models);
    require("./services/campaign.service.server.js")(app, models);
    require("./services/manager.service.server.js")(app, models);
    require("./services/message.service.server.js")(app, models);
    require("./services/user.service.server.js")(app, models);
};