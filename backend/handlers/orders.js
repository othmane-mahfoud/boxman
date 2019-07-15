const db = require("../models");

// POST - /api/users/:id/orders/
exports.createOrder = async function(req, res, next) {
    try {
        let order = await db.Order.create({
            itemType: req.body.itemType,
            deliveryType: req.body.deliveryType,
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
            price: req.body.price,
            customer: req.params.id,
            boxman: req.body.boxmanId
        })
        let foundCustomer = await db.User.findById(req.params.id);
        foundCustomer.orders.push(order.id)
        await foundCustomer.save()
        // let foundOrder = await db.Order.findById(order._id)
        //     .populate("customer", {
        //         name: true,
        //         address: true,
        //         phoneNumber: true
        //     })
        return res.status(200).json(order)
    } catch(err) {
        return(next(err))
    }
}

// GET - /api/users/:id/orders/:order_id
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
