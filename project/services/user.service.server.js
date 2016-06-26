var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/api/user/:userId", findUserById);
    app.get("/api/user/manager/:managerId", findUsersByManagerId);
    app.get("/api/user/campaign/:campaignId", findUsersByCampaignId);
    app.post("/api/user/manager/:managerId/search", findUsersBySearch);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user/login", passport.authenticate('local-user'), login);
    app.get('/api/userloggedin', loggedin);
    app.post('/api/user/logout', logout);
    app.post('/api/user/register', register);

    passport.use('local-user', new LocalStrategy(localStrategy));

    function login(req, res) {
        var user = req.user;

        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();

        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        return userModel
            .createUser(user)
            .then(function(user) {
                res.json(user);
            })
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(function(user) {
                res.json(user);
            })
    }

    function findUsersByManagerId(req, res) {
        var id = req.params.managerId;

        userModel
            .findUsersByManagerId(id)
            .then(function(users) {
                res.json(users);
            })
    }

    function findUsersByCampaignId(req, res) {
        var id = req.params.campaignId;

        userModel
            .findUsersByCampaignId(id)
            .then(function(users) {
                res.json(users);
            })
    }

    function findUsersBySearch(req, res) {
        var id = req.params.managerId;
        var search = req.body.search;

        userModel
            .findUsersBySearch(id, search)
            .then(function(users) {
                res.json(users);
            })
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(id, user)
            .then(function(user) {
                res.json(user);
            })
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(function(user) {
                res.json(user);
            })
    }
}