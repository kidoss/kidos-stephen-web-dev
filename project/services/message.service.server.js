module.exports = function(app, models) {

    var messageModel = models.messageModel;

    app.post("/api/message", createMessage);
    app.get("/api/message/:toId", findAllMessagesByToId);
    app.delete("/api/message/:messageId", deleteMessage);

    function createMessage(req, res) {
        var id = req.params.campaignId;
        var message = req.body;

        messageModel
            .createMessage(message)
            .then(function(message) {
                res.json(message);
            })
    }

    function findAllMessagesByToId(req, res) {
        var id = req.params.toId;

        messageModel
            .findAllMessagesByToId(id)
            .then(function(messages) {
                res.json(messages);
            })
    }

    function deleteMessage(req, res) {
        var id = req.params.messageId;

        messageModel
            .deleteMessage(id)
            .then(function(message) {
                res.json(message);
            })
    }
}