const router = require('express').Router()
let Tv = require('../models/electronics-models/tv.model')

router.route('/tv').get((req, res) => {
    Tv.find().then(f => res.json(f)).catch(err => res.status('400').json('Error:' + err))
})

router.route('/tv/add').post((req, res) => {
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category
    const subcategory = req.body.subcategory
    const diagonal = req.body.diagonal
    const resolution = req.body.resolution
    const smart = req.body.smart
    const wifi = req.body.wifi
    const description = req.body.description
    const img_id = req.body.img_id
    const newItem = new Tv({
        name,
        price,
        category,
        subcategory,
        diagonal,
        resolution,
        smart,
        wifi,
        description,
        img_id
    })
    newItem.save().then(() => res.json(`Added`)).catch(err => res.status('400').json('Error:' + err))
})

module.exports = router