module.exports = function() {

    var mongoose = require("mongoose")
    var ManagerSchema = require("./manager.schema.server")();
    var Manager = mongoose.model("Manager", ManagerSchema);

    var api = {
        createManager: createManager,
        findManagerById: findManagerById,
        findManagerByUsername: findManagerByUsername,
        updateManager: updateManager,
        deleteManager: deleteManager,
        findUserByGoogleId: findUserByGoogleId
    };
    return api;

    function createManager(manager) {
        return Manager.create(manager);
    }

    function findManagerById(managerId) {
        return Manager.findById(managerId);
    }

    function updateManager(managerId, manager) {
        delete manager._id;
        return Manager
            .update({_id: managerId},{
                $set: {
                    managername: manager.managername,
                    email: manager.email,
                    firstName: manager.firstName,
                    lastName: manager.lastName
                }
            });
    }

    function findManagerByUsername(username) {
        return Manager.findOne({username: username});
    }

    function deleteManager(managerId) {
        return Manager.remove({_id: managerId});
    }

    function findUserByGoogleId(googleId) {
        return Manager.findOne({'google.id': googleId});
    }
};