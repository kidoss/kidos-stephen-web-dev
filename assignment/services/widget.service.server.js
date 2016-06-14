module.exports = function(app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});
    var widgetModel = models.widgetModel;

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", getWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var id = req.params.pageId;

        var widget = {
            type: req.body.type
        };

        widgetModel
            .createWidget(id, widget)
            .then(function(widget) {
                res.json(widget);
            })
    }
    
    function getWidgets(req, res) {
        var start = req.query['start'];
        var end = req.query['end'];
        
        if(start && end) {
            return reorderWidget(req.params.pageId, start, end, res);
        } else {
            return findAllWidgetsForPage(req, res);
        }
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(id)
            .then(function(widgets) {
                res.json(widgets);
            })
    }

    function reorderWidget(pageId, start, end, res) {
        widgetModel.reorderWidget(pageId, start, end);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;

        widgetModel
            .findWidgetById(id)
            .then(function(widget) {
                res.json(widget);
            })
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(id, widget)
            .then(function(widget) {
                res.json(widget);
            })
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;

        widgetModel
            .deleteWidget(id)
            .then(function(widget) {
                res.json(widget);
            })
    }

    function uploadImage(req, res) {
        var uid = req.body.userId;
        var wid = req.body.websiteId;
        var pid = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = {
            url: "/uploads/" + filename
        };

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function(widget) {
                res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + widgetId);
            })
    }
}