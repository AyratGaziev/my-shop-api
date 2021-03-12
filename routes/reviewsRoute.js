const router = require("express").Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const reviewsController = require("../controllers/reviewsController");

//GET REQUESTS
//GET All reviews
router.route("/reviews").get(reviewsController.getAllReviews);
//GET product reviews with reviews count
router
    .route("/reviews/with-count/:id")
    .get(reviewsController.getProdReviewsWithCount);

//GET Review by ID
router.route("/reviews/:id").get(reviewsController.getReviewById);

//POST REQUESTS
router.post(
    "/reviews/add",
    roleMiddleware(["CUSTOMER"]),
    reviewsController.addReview
);

module.exports = router;
