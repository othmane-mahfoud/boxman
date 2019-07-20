const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
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
        items: [
            {
                name: String,
                picked: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        status: {
            type: String,
            default: "none"
        },
        minPrice: {
            type: Number,
            min: [0, 'Input a valid price']
        },
        maxPrice: {
            type: Number,
            min: [0, 'Input a valid price']
        },
        estimatedPrice: {
            type: Number
        },
        estimatedDistance: {
            type: String
        },
        estimatedDuration: {
            type: String
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        boxman: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Boxman"
        },
    },
    {
      timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
