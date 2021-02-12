const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Smartphone = new Schema({
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
    diagonal: {
        type: String,
        required: true,
        trim: true,
    },
    ram: {
        type: String,
        required: true,
        trim: true,
    },
    memory: {
        type: String,
        required: true,
        trim: true,
    },
    cpu: {
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

const ShopSmartphone = mongoose.model('Smartphone', Smartphone)

module.exports = ShopSmartphone