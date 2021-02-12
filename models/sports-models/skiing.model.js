const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Skiing = new Schema({
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
    material: {
        type: String,
        required: true,
        trim: true,
    },
    purpose: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    size: [{ size: String }],
    description: {
        type: String,
        required: true,
        trim: true,
    },
    img_id: Number
})

const ShopSkiing = mongoose.model('Skiing', Skiing)

module.exports = ShopSkiing