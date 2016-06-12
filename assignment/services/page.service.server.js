module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._id = (new Date()).getTime() + "";
        page.websiteId = websiteId;

        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var id = req.params.websiteId;
        var results = [];

        for(var i in pages) {
            if(pages[i].websiteId === id) {
                results.push(pages[i]);
            }
        }

        res.send(results);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;

        for(var i in pages) {
            if(pages[i]._id === id) {
                res.send(pages[i]);
                return;
            }
        }

        res.send({});
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var page = req.body;

        for(var i in pages) {
            if(pages[i]._id === id) {
                pages[i] = page;
                res.send(pages[i]);
                return;
            }
        }

        res.send({});
    }

    function deletePage(req, res) {
        var id = req.params.pageId;

        for(var i in pages) {
            if(pages[i]._id === id) {
                pages.splice(i, 1);
                res.send(true);
                return;
            }
        }

        res.send(false);
    }
}