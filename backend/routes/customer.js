var express = require('express')
var router  = express.Router({ mergeParams: true })

var { getProfile, editProfile, createOrder, fetchOrders, getOrder, editOrder } = require('../handlers/customers')

// prefix: /api/customer/:id

router
    .route('/profile')
    .get(getProfile)
    .put(editProfile)

router
    .route('/orders')
    .get(fetchOrders)
    .post(createOrder)

router
    .route('/orders/:order_id')
    .get(getOrder)
    .put(editOrder)

module.exports = router