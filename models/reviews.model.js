const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Reviews = new Schema({
    prodId: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true
    },
    advantages: {
        type: String,
        required: true
    },
    limitations: {
        type: String,
        reqired: true
    },    
    comments: {
        type: String,
        required: true
    }
},{ versionKey: false })

const ShopReviews= mongoose.model('Reviews', Reviews)

module.exports = ShopReviews