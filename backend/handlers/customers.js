const db = require("../models");

// ORDERS

// GET - /api/customers/:id/orders/
exports.fetchOrders = async function(req, res, next) {
    try {
        let orders = await db.Order.find({customer: req.params.id}).sort({ createdAt: 'desc' })
        return res.status(200).json(orders)
    } catch(err) {
        return(next(err))
    }
}

// POST - /api/customers/:id/orders/
exports.createOrder = async function(req, res, next) {
    try {
        let order = await db.Order.create({
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            items: req.body.items,
            customer: req.params.id,
        })
        return res.status(200).json(order)
    } catch(err) {
        return(next(err))
    }
}

// GET - /api/customers/:id/orders/:order_id
exports.getOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findById(req.params.order_id)
        return res.status(200).json(order)
    }
    catch (err) {
        return(next(err))
    }
}

// PUT - /api/users/:id/orders/:order_id
exports.editOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findOneAndUpdate({ _id: req.params.order_id }, req.body, {new: true})
        await order.save()
        res.status(200).json(order)
    } catch(err) {
        return next(err);
    }
}

// DELETE /api/users/:id/orders/:order_id
exports.deleteOrder = async function(req, res, next) {
    try {
        let foundOrder = await db.Order.findById(req.params.order_id)
        await foundOrder.remove()
        return res.status(200).json(foundOrder)
    } catch(err) {
        return next(err)
    }
}

// PROFILE

// GET - /api/customers/:id/profile
exports.getProfile = async function(req, res, next) {
    try {
        let customer = await db.Customer.findById(req.params.id)
        res.status(200).json(customer)
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

// PUT - /api/customers/:id/profile
exports.editProfile = async function(req, res, next) {
    try {
        let customer = await db.Customer.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
        res.json(customer)
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}