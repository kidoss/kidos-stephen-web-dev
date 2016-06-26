module.exports = function() {

    var mongoose = require("mongoose")
    var MessageSchema = require("./message.schema.server")();
    var Message = mongoose.model("Message", MessageSchema);

    var api = {
        createMessage: createMessage,
        findAllMessagesByToId: findAllMessagesByToId,
        deleteMessage: deleteMessage
    };
    return api;

    function createMessage(message) {
        return Message.create(message);
    }

    function findAllMessagesByToId(toId) {
        return Message.find({to: toId});
    }

    function deleteMessage(messageId) {
        return Message.remove({_id: messageId});
    }
};