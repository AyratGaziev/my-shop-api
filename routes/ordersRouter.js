const router = require("express").Router();
const ordersController = require("../controllers/ordersController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
    "/orders/:userId",
    roleMiddleware(["CUSTOMER"]),
    ordersController.getUserOrders
);
router.post(
    "/setOrders",
    roleMiddleware(["CUSTOMER"]),
    ordersController.addOrder
);

module.exports = router;
