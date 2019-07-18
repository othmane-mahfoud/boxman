const db = require('../models')
const jwt = require('jsonwebtoken')

exports.registerBoxman = async function(req, res, next) {
    try {
        let boxman = await db.Boxman.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: "boxman"
        });
        let { _id, email, name, role} = boxman;
        let token = jwt.sign(
            {
                _id,
                email,
                name,
                role
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            email,
            name,
            role,
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

exports.registerCustomer = async function(req, res, next) {
    try {
        let customer = await db.Customer.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: "customer"
        })
        let { _id, email, name, role } = customer;
        let token = jwt.sign(
            {
                _id,
                email,
                name,
                role
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            email,
            name,
            role,
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

exports.loginBoxman = async function(req, res, next) {
    try {
        let boxman = await db.Boxman.findOne({
            email: req.body.email
        });
        let { _id, email, name, role } = boxman;
        let isMatch = await boxman.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    _id,
                    email,
                    name,
                    role
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                _id,
                email,
                name,
                role,
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

exports.loginCustomer = async function(req, res, next) {
    try {
        let customer = await db.Customer.findOne({
            email: req.body.email
        });
        let { _id, email, name, role } = customer;
        let isMatch = await customer.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    _id,
                    email,
                    name,
                    role
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                _id,
                email,
                name,
                role,
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

exports.fbRegisterBoxman = async function(req, res, next) {
    try {
        let boxman = await db.Boxman.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: "boxman"
        });
        let { _id, fbId, email, name, role } = boxman;
        let token = jwt.sign(
            {
                _id,
                fbId,
                email,
                name,
                role
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            fbId,
            email,
            name,
            role,
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

exports.fbRegisterCustomer = async function(req, res, next) {
    try {
        let customer = await db.Customer.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: "customer"
        });
        let { _id, fbId, email, name, role } = customer;
        let token = jwt.sign(
            {
                _id,
                fbId,
                email,
                name,
                role
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            fbId,
            email,
            name,
            role,
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

exports.fbLoginBoxman = async function(req, res, next) {
    try {
        let boxman = await db.Boxman.findOne({
            fbId: req.body.fbId
        });
        let { _id, fbId, email, name, role } = boxman;
        let token = jwt.sign(
            {
                _id,
                fbId,
                email,
                name,
                role
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            fbId,
            email,
            name,
            role,
            token
        });
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
}

exports.fbLoginCustomer = async function(req, res, next) {
    try {
        let customer = await db.Customer.findOne({
            fbId: req.body.fbId
        });
        let { _id, fbId, email, name, role } = customer;
        let token = jwt.sign(
            {
                _id,
                fbId,
                email,
                name,
                role
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            fbId,
            email,
            name,
            role,
            token
        });
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
}
