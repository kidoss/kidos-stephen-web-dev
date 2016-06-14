module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password
        };

        userModel
            .createUser(user)
            .then(function(user) {
                res.json(user);
            })
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else {
            res.json({});
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                res.json(user);
            })
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(function(user) {
                res.json(user);
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