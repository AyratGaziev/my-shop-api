const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TShirt = new Schema({
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

const ShopTShirt = mongoose.model('TShirt', TShirt)

module.exports = ShopTShirt