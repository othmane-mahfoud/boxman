const db = require('../models')

// ORDERS

// GET - /api/boxman/:id/orders/
exports.fetchOrders = async function(req, res, next) {
    try {
        let orders = await db.Order.find({boxman: req.params.id, status: "assigned"})
        .sort({ createdAt: 'desc' })
        return res.status(200).json(orders)
    } catch(err) {
        return(next(err))
    }
}

// GET - /api/boxman/:id/orders/unassigned
exports.fetchUnassignedOrders = async function(req, res, next) {
    try {
        let orders = await db.Order.find({boxman: req.params.id, status: 'none'})
        .sort({ createdAt: 'desc' })
        .populate("customer", {
            name: true
        });
        return res.status(200).json(orders)
    } catch(err) {
        return(next(err))
    }
}

// GET - /api/boxman/:id/orders/:order_id
exports.getOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findById(req.params.order_id)
        .populate("customer", {
            name: true,
            phone: true
        });
        return res.status(200).json(order)
    }
    catch (err) {
        return(next(err))
    }
}

// PUT - /api/boxman/:id/orders/:order_id
exports.editOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findOneAndUpdate({ _id: req.params.order_id }, req.body, {new: true})
        await order.save()
        res.status(200).json(order)
    } catch(err) {
        return next(err);
    }
}

// PUT - /api/boxman/:id/orders/:order_id/accept
exports.acceptOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findOneAndUpdate(
            { _id: req.params.order_id }, 
            { status: "assigned" }, 
            { new: true }
        )
        await order.save()
        let boxman = await db.Boxman.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { orders: { _id: req.params.order_id} } },
            { new: true }
        );
        await boxman.save()
        res.status(200).json(order)
    }
    catch(err) {
        return next(err)
    }
}

// PUT - /api/boxman/:id/orders/:order_id/refuse
exports.refuseOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findOneAndUpdate(
            { _id: req.params.order_id }, 
            { status: "refused" }, 
            { new: true }
        )
        await order.save()
    }
    catch(err) {
        return next(err)
    }
}

// PUT - /api/boxman/:id/orders/:order_id/deliver
exports.deliverOrder = async function(req, res, next) {
    try {
        let order = await db.Order.findOneAndUpdate(
            { _id: req.params.order_id }, 
            { status: "delivered" }, 
            { new: true }
        )
        await order.save()
        let boxman = await db.Boxman.findOneAndUpdate(
            { _id: req.params.id },
            { $pullAll: { orders: [req.params.order_id] } },
            { new: true }
        );
        await boxman.save()
        res.status(200).json(order)
    }
    catch(err) {
        return next(err)
    }
}

// PROFILE

// GET - api/boxman/:id/profile
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

// PUT - api/boxman/:id/profile
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

// Utilities

exports.updateBoxmanLocation = async function(server) {
    //here we update boxman location every 5s
    const io = require("socket.io")(server);
    io.on('connect', socket => {
        socket.on("updateBoxmanLocation", async ({id, location}) => {
            let boxman = await db.Boxman.findOneAndUpdate({ _id: id }, { $set: { currentLocation: location } }, {new: true})
            console.log(boxman.currentLocation)
        });
    })
    
}