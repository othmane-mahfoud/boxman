var db = require('../models')

exports.getUsers = async function(req, res) {
    try {
        let users = await db.User.find()
        res.json(users)
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.editUser = async function(req, res) {
    try {
        let user = await db.User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
        res.json(user)
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}
