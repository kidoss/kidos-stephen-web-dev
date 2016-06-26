var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app, models) {

    var managerModel = models.managerModel;
    var userModel = models.userModel;

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    app.get("/api/manager/:managerId", findManagerById);
    app.put("/api/manager/:managerId", updateManager);
    app.post("/api/manager/login", passport.authenticate('local-manager'), login);
    app.get('/api/managerloggedin', loggedin);
    app.post('/api/manager/logout', logout);
    app.post('/api/manager/register', register);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/auth/success',
            failureRedirect: '/#/manager/login'
        }));
    app.get('/auth/success', authSuccess);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('local-manager', new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function authSuccess(req, res) {
        res.redirect("/project/#/manager/" + req.user._id);
    }

    function login(req, res) {
        var manager = req.user;
        
        res.json(manager);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();

        res.send(200);
    }

    function register (req, res) {
        var manager = req.body;
        manager.password = bcrypt.hashSync(manager.password);

        managerModel
            .createManager(manager)
            .then(
                function(manager){
                    if(manager){
                        req.login(manager, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(manager);
                            }
                        });
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        managerModel
            .findManagerByUsername(username)
            .then(
                function (manager) {
                    if(manager && bcrypt.compareSync(password, manager.password)) {
                        done(null, manager);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        managerModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return managerModel
                            .createManager(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user._manager) {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else {
            managerModel
                .findManagerById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function findManagerById(req, res) {
        var id = req.params.managerId;

        managerModel
            .findManagerById(id)
            .then(function(manager) {
                res.json(manager);
            })
    }

    function updateManager(req, res) {
        var id = req.params.managerId;
        var manager = req.body;

        managerModel
            .updateManager(id, manager)
            .then(function(manager) {
                res.json(manager);
            })
    }
}