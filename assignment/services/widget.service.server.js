module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;

        var widget = {
            _id: (new Date()).getTime() + "",
            pageId: pageId,
            widgetType: req.body.type
        };
        
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params.pageId;
        var results = [];

        for(var i in widgets) {
            if(widgets[i].pageId === id) {
                results.push(widgets[i]);
            }
        }

        res.send(results);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                res.send(widgets[i]);
                return;
            }
        }

        res.send({});
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var widget = req.body;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets[i] = widget;
                res.send(widgets[i]);
                return;
            }
        }

        res.send({});
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets.splice(i, 1);
                res.send(true);
                return;
            }
        }

        res.send(false);
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

        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
            }
        }

        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + widgetId);
    }
}