var express = require('express')
var router  = express.Router({ mergeParams: true })

var { getProfile, editProfile, editOrder, fetchOrders, getOrder } = require('../handlers/boxmen')

// prefix: /api/boxman/:id

router
    .route('/profile')
    .get(getProfile)
    .put(editProfile)

router
    .route('/orders')
    .get(fetchOrders)

router
    .route('/orders/:order_id')
    .get(getOrder)
    .put(editOrder)

module.exports = router