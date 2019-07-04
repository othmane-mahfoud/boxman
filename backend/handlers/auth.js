const db = require('../models')
const jwt = require('jsonwebtoken')

exports.register = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, name, email } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                id,
                email,
                name
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                email,
                name,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (e) {
        return next({ status: 400, message: "Invalid Email/Password." });
    }
}

exports.login = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, email, name } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    email,
                    name
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                email,
                name,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (e) {
        return next({ status: 400, message: "Invalid Email/Password." });
    }
}