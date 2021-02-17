const router = require('express').Router()
const ShopProduct = require('../models/product.model')

//GET requests
router.route('/products').get((req, res) => {
    ShopProduct.find().then(product => res
        .json(product))
        .catch(err => res.status('400').json('Error:' + err))
})
router.route('/products/notebook').get((req, res) => {
    ShopProduct.findOne({subcategory: "Ноутбуки"}).then(product => res
        .json(product))
        .catch(err => res.status('400').json('Error:' + err))
})
router.route('/products/phones').get((req, res) => {
    ShopProduct.findOne({subcategory: "Смартфоны"}).then(product => res
        .json(product))
        .catch(err => res.status('400').json('Error:' + err))
})
router.route('/products/tv').get((req, res) => {
    ShopProduct.findOne({subcategory: "Телевизоры"}).then(product => res
        .json(product))
        .catch(err => res.status('400').json('Error:' + err))
})
router.route('/products/from/:start/limit/:limit').get((req, res) => {
    const {start,limit} = req.params
    ShopProduct.find()
        .sort({ discount: 1 })
        .skip(+start)
        .limit(+limit)
        .then(product => {
            return res.json(product)
        })
        .catch(err => res.status('400').json('Error:' + err))
})
router.route('/products/some/limit/:limit/start/:start').get((req, res) => {
    const { start, limit } = req.params
    console.log(req.params);
    ShopProduct.find()
        .sort({ discount: 1 })
        .skip(+start)
        .limit(+limit)
        .then(product => res.json(product))
        .catch(err => res.status('400').json('Error:' + err))
})

//POST requests
router.route('/products/add').post((req, res) => {
    const {
        name,
        price,
        discount,
        category,
        subcategory,
        description,
        features,
        img
    } = req.body
    const newItem = new ShopProduct({
        name,
        price,
        discount,
        category,
        subcategory,
        description,
        features,
        img
    })
    newItem
        .save()
        .then(() => res.json(`Added ${name}`))
        .catch(err => res.status('400').json('Error:' + err))
})

//DELETE requests
router.route('/products/del/:id').delete((req, res) => {
    const {id} = req.params
    ShopProduct.findByIdAndDelete({_id: id},(err, deleted) => {
        if (err) {
            res.status(400).json('Error: '+err)
        }
        console.log(id);
        res.json('Deleted'+ deleted)
    })
})
router.route('/products/del/many/:category').delete((req, res) => {
    const { category } = req.params
    ShopProduct.deleteMany({ category: category}, (err, del) => {
        if (err) {
            res.status(400).json('Error: ', err)
        }

        res.json(`Deleted: ${del}`)
    })
})

//PATCH requests
router.route('/products/update/:id').patch((req, res) => {
    const { id } = req.params
    const {name, price, category, subcategory, description } = new ShopProduct(req.body)
    ShopProduct.findByIdAndUpdate({ _id: id },{name,price,category,subcategory,description}, (err, update) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        }
        res.json('Updated: '+ update)
    })
})



module.exports = router