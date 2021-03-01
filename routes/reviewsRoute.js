
const router = require('express').Router()
const ShopReviews = require('../models/reviews.model')

//GET REQUESTS
//GET All reviews
router.route('/reviews').get((req, res) => {
    ShopReviews.find()
        .then(reviews => {
            res.json(reviews)     
        })
        .catch(err=> res.sendStatus(400).json("Error"+err))
})
//GET Review by ID
router.route('/reviews/:id').get((req, res) => {
    const id = req.params
    ShopReviews.find({ _id: id })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.sendStatus(400).json('Error'+err))
})

//POST REQUESTS
router.route('/reviews/add').post((req, res) => {
    const newReview = new ShopReviews(req.body)
    newReview
        .save()
        .then(() => res.json(req.body))
        .catch((err)=> res.json("Error"+err))
})


//DELETE REQUESTS

module.exports = router