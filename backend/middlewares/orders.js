exports.ensureOrder = (customer_id, user_id) => (
    customer_id.toString() === user_id.toString()
)