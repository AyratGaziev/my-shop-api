const router = require("express").Router();
const ShopReviews = require("../models/reviews.model");
const ShopProducts = require("../models/product.model");
const roleMiddleware = require("../middleware/roleMiddleware");

//GET REQUESTS
//GET All reviews
router.route("/reviews").get((req, res) => {
    ShopReviews.find()
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => res.sendStatus(400).json("Error" + err));
});
//GET product reviews with reviews count
router.route("/reviews/with-count/:id").get(async (req, res) => {
    const { id } = req.params; //Product ID
    const count = await ShopReviews.countDocuments({ prodId: id });
    const reviews = await ShopReviews.find({ prodId: id });
    const product = await ShopProducts.find({ _id: id });
    res.json({
        product,
        reviews,
        reviewsCount: count
    });
});

//GET Review by ID
router.route("/reviews/:id").get((req, res) => {
    const id = req.params;
    ShopReviews.find({ _id: id })
        .then((review) => {
            res.json(review);
        })
        .catch((err) => res.sendStatus(400).json("Error" + err));
});

//POST REQUESTS
router.post("/reviews/add", roleMiddleware(["CUSTOMER"]), async (req, res) => {
    try {
        const newReview = new ShopReviews(req.body);
        await newReview.save();
        const prodReviews = await ShopReviews.find({ prodId: req.body.prodId });
        res.json(prodReviews[prodReviews.length - 1]);
    } catch (e) {
        console.log(e);
        res.status(400).json("Не верный запрос", e);
    }
});

//DELETE REQUESTS

module.exports = router;
