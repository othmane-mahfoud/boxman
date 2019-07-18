const db = require('../models')

// ORDERS

// GET - /api/boxmen/:id/orders/
exports.fetchOrders = async function(req, res, next) {
    try {
        let orders = await db.Order.find({boxman: req.params.id}).sort({ createdAt: 'desc' })
        return res.status(200).json(orders)
    } catch(err) {
        return(next(err))
    }
}

// GET - /api/boxmen/:id/orders/:order_id
exports.getOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findById(req.params.order_id)
        return res.status(200).json(order)
    }
    catch (err) {
        return(next(err))
    }
}

// PUT - /api/boxmen/:id/orders/:order_id
exports.acceptOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findOneAndUpdate({ _id: req.params.order_id }, {boxman: req.params.id, status:"assigned"}, {new: true})
        await order.save()
        res.status(200).json(order)
    } catch(err) {
        return next(err);
    }
}

// PROFILE

// GET - api/boxmen/:id/profile
exports.getProfile = async function(req, res, next) {
    try {
        let boxman = await db.Boxman.findById(req.params.id)
        res.status(200).json(boxman)
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

// PUT - api/boxmen/:id/profile
exports.editProfile = async function(req, res, next) {
    try {
        let boxman = await db.Boxman.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
        res.status(200).json(boxman)
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}