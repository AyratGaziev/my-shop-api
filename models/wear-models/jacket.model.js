const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Jacket = new Schema({
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

const ShopJacket = mongoose.model('Jacket', Jacket)

module.exports = ShopJacket