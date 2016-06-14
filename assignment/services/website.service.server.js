module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsiteForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var id = req.params.userId;
        var website = req.body;

        websiteModel
            .createWebsite(id, website)
            .then(function(website) {
                res.json(website);
            })
    }

    function findAllWebsiteForUser(req, res) {
        var id = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(id)
            .then(function(websites) {
                res.json(websites);
            })
    }
    
    function findWebsiteById(req, res) {
        var id = req.params.websiteId;

        websiteModel
            .findWebsiteById(id)
            .then(function(website) {
                res.json(website);
            })
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(id, website)
            .then(function(website) {
                res.json(website);
            })
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        websiteModel
            .deleteWebsite(id)
            .then(function(website) {
                res.json(website);
            })
    }
}