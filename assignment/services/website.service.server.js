module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsiteByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var devId = req.params.userId;
        var website = req.body;
        website.developerId = devId;
        website._id = (new Date()).getTime() + "";

        websites.push(website);
        res.send(website);
    }

    function findAllWebsiteByUser(req, res) {
        var id = req.params.userId;
        var results = [];

        for(var i in websites) {
            if(websites[i].developerId === id) {
                results.push(websites[i]);
            }
        }

        res.send(results);
    }
    
    function findWebsiteById(req, res) {
        var id = req.params.websiteId;

        for(var i in websites) {
            if(websites[i]._id === id) {
                res.send(websites[i]);
                return;
            }
        }

        res.send({});
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var website = req.body;

        for(var i in websites) {
            if(websites[i]._id === id) {
                websites[i] = website;
                res.send(websites[i]);
                return;
            }
        }

        res.send({});
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        for(var i in websites) {
            if(websites[i]._id === id) {
                websites.splice(i, 1);
                res.send(true);
                return;
            }
        }

        res.send(false);
    }
}