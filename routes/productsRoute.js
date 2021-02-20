const router = require('express').Router()
const ShopProduct = require('../models/product.model')

//GET REQUESTS
//GET all products & products by category, without limit & skiping 
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

//GET all products, skip some limited response
router.route('/products/limit/:limit/start/:start').get((req, res) => {
    const { start, limit } = req.params

    ShopProduct.countDocuments((err, count) => {
        if (err) {
            res.sendStatus(400).json('Error: ' + err)
        }

        ShopProduct
            .find()
            .sort({ price: 1 })
            .skip(+start)
            .limit(+limit)
            .then(allProducts => {
                if (start + limit === count || allProducts.length < limit) {
                    res.json({allProducts, done: true})
                } else {
                    res.json({allProducts, done: false})
                }
            })
    })  
       
})
//GET some products, skip some limited response
router.route('/products/some/limit/:limit/start/:start/category/:category').get((req, res) => {
    const { start, limit, category } = req.params

    if (category === 'allProducts') {
        ShopProduct.find().countDocuments((err, count) => {
            if (err) {
                res.sendStatus(400).json('Error: ' + err)
            }

            ShopProduct
                .find()
                .sort({ price: 1 })
                .skip(+start)
                .limit(+limit)
                .then(products => {

                    if ((+start) + (+limit) === count || products.length < limit) {
                        res.json({
                            products,
                            done: true,
                            category
                        })
                    } else {
                        res.json({
                            products,
                            done: false,
                            category
                        })
                    }
                })
        })  
    } else {
        ShopProduct.find({category}).countDocuments((err, count) => {
            if (err) {
                res.sendStatus(400).json('Error: ' + err)
            }

            ShopProduct
                .find({category})
                .sort({ price: 1 })
                .skip(+start)
                .limit(+limit)
                .then(products => {

                    if ((+start) + (+limit) === count || products.length < limit) {
                        res.json({
                            products,
                            done: true,
                            category
                        })
                    } else {
                        res.json({
                            products,
                            done: false,
                            category
                        })
                    }
                })
        })  
    }
       
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