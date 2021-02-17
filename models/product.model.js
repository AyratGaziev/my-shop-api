const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Product = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    discount: {
        type: Number,
        trim: true,
        min: 0.1,
        max: 1
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subcategory: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    features: [{
        name: String,
        descrition: String
    }],
    img: {
        type: String,
        required: true
    }
},{ versionKey: false })

const ShopProduct= mongoose.model('Product', Product)

module.exports = ShopProduct