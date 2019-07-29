var express = require('express')
var router  = express.Router({ mergeParams: true })

var { getProfile, editProfile, editOrder, fetchOrders, fetchUnassignedOrders, getOrder, acceptOrder, refuseOrder, deliverOrder } = require('../handlers/boxmen')

// prefix: /api/boxman/:id

router
    .route('/profile')
    .get(getProfile)
    .put(editProfile)

router
    .route('/orders')
    .get(fetchOrders)

router
    .route('/orders/unassigned')
    .get(fetchUnassignedOrders)

router
    .route('/orders/:order_id')
    .get(getOrder)
    .put(editOrder)

router
    .route('/orders/:order_id/accept')
    .put(acceptOrder)

router
    .route('/orders/:order_id/refuse')
    .put(refuseOrder)

router
    .route('/orders/:order_id/deliver')
    .put(deliverOrder)

module.exports = router