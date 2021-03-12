const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Orders = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: String,
            reqired: true
        },
        products: [
            {
                prodId: {
                    type: String,
                    required: true,
                    trim: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: String,
                    required: true
                },
                count: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {
            type: Number,
            reqired: true
        }
    },
    { versionKey: false }
);

const ShopOrders = mongoose.model("Orders", Orders);

module.exports = ShopOrders;
