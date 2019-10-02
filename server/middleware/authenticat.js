var { Users } = require('./../models/user');

var authenticat = (req, res, next) => {
    let token = req.headers['x-auth'];
    Users.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticat};