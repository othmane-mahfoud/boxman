var express = require('express')
var router  = express.Router({ mergeParams: true })

var { getProfile, editProfile, acceptOrder, fetchOrders, getOrder } = require('../handlers/boxmen')

// prefix: /api/boxmen/:id

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
    .put(acceptOrder)

module.exports = router