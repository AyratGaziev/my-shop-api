const ShopOrders = require("../models/orders.model");

class OrdersController {
    async addOrder(req, res) {
        const { userId, products, total } = req.body;

        try {
            const newOrder = new ShopOrders({ userId, products, total });
            await newOrder.save();
            const orders = await ShopOrders.find({ userId });
            return res.json(orders);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Orders error" });
        }
    }
    async getUserOrders(req, res) {
        const { userId } = req.params;
        try {
            const userOrders = await ShopOrders.find({ userId: userId });
            return res.json(userOrders);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Orders error" });
        }
    }
}
module.exports = new OrdersController();
