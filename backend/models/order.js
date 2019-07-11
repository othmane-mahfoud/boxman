const mongoose = require("mongoose");
const User = require("./user");

const orderSchema = new mongoose.Schema(
    {
        itemType: {
            type: String,
            default: "other"
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        deliveryType: {
            type: String,
            required: true
        },
        price: {
            type: Number
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        boxman: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
      timestamps: true
    }
)

orderSchema.pre("remove", async function(next) {
    try {
        // find a user
        let customer = await User.findById(this.customer)
        let boxman = await User.findById(this.boxman)
        // remove the id of the message from their messages list
        customer.orders.remove(this.id)
        boxman.orders.remove(this.id)
        // save that user
        await customer.save();
        await boxman.save();
        // return next
        return next();
    } catch (err) {
        return next(err);
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
