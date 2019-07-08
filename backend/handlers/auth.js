const db = require('../models')
const jwt = require('jsonwebtoken')

exports.register = async function(req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let { id, email, name } = user;
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
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
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
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
}

exports.fbRegister = async function(req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let { id, fbId, email, name } = user;
        let token = jwt.sign(
            {
                id,
                fbId,
                email,
                name
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            fbId,
            email,
            name,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = "You have registered previously";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.fbLogin = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            fbId: req.body.fbId
        });
        let { id, fbId, email, name } = user;
        let token = jwt.sign(
            {
                id,
                fbId,
                email,
                name
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            fbId,
            email,
            name,
            token
        });
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
}
