module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var id = req.params.websiteId;
        var page = req.body;

        pageModel
            .createPage(id, page)
            .then(function(page) {
                res.json(page);
            })
    }

    function findAllPagesForWebsite(req, res) {
        var id = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(id)
            .then(function(pages) {
                res.json(pages);
            })
    }

    function findPageById(req, res) {
        var id = req.params.pageId;

        pageModel
            .findPageById(id)
            .then(function(page) {
                res.json(page);
            })
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(id, page)
            .then(function(page) {
                res.json(page);
            })
    }

    function deletePage(req, res) {
        var id = req.params.pageId;

        pageModel
            .deletePage(id)
            .then(function(page) {
                res.json(page);
            })
    }
}