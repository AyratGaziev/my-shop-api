const ShopReviews = require("../models/reviews.model");
const ShopProducts = require("../models/product.model");

class ReviewsController {
    async getAllReviews(req, res) {
        try {
            const reviews = await ShopReviews.find();
            return res.json(reviews);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка отзывы не найдены" });
        }
    }

    async getProdReviewsWithCount(req, res) {
        const { id } = req.params; //Product ID
        try {
            const count = await ShopReviews.countDocuments({ prodId: id });
            const reviews = await ShopReviews.find({ prodId: id });
            const product = await ShopProducts.find({ _id: id });
            return res.json({
                product,
                reviews,
                reviewsCount: count
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка отзывы не найдены" });
        }
    }

    async getReviewById(req, res) {
        const { id } = req.params; //Product ID
        try {
            const review = await ShopReviews.find({ _id: id });
            return res.json(review);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка отзыв не найден" });
        }
    }

    async addReview(req, res) {
        try {
            const newReview = new ShopReviews(req.body);
            await newReview.save();
            const prodReviews = await ShopReviews.find({
                prodId: req.body.prodId
            });
            return res.json(prodReviews[prodReviews.length - 1]);
        } catch (e) {
            console.log(e);
            res.status(400).json("Не верный запрос", e);
        }
    }
}
module.exports = new ReviewsController();
