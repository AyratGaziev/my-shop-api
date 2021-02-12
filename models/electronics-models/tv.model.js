const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Tv = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
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
    diagonal: {
        type: String,
        required: true,
        trim: true,
    },
    resolution: {
        type: String,
        required: true,
        trim: true,
    },
    smart: {
        type: String,
        required: true,
        trim: true,
    },
    wifi: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    img_id: Number
})

const ShopTv = mongoose.model('Tv', Tv)

module.exports = ShopTv