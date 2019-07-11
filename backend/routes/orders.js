const express = require("express");
const router = express.Router({ mergeParams: true });

const { createOrder, getOrder, deleteOrder, editOrder } = require("../handlers/orders");

// prefix - /api/users/:id/orders
router.route("/").post(createOrder);

// prefix - /api/users/:id/orders/:order_id
router
  .route("/:order_id")
  .get(getOrder)
  .delete(deleteOrder)
  .put(editOrder)

module.exports = router;
