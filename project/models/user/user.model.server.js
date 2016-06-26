module.exports = function() {

    var mongoose = require("mongoose")
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUsersByManagerId: findUsersByManagerId,
        findUsersByCampaignId: findUsersByCampaignId,
        findUsersBySearch: findUsersBySearch,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUsersByManagerId(managerId) {
        return User.find({"_manager": managerId});
    }

    function findUsersByCampaignId(campaignId) {
        return User.find({"campaigns": campaignId});
    }

    function findUsersBySearch(managerId, search) {
        return User.find({"_manager": managerId, "username": new RegExp(search, 'i')});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    campaigns: user.campaigns,
                    messages: user.messages
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};