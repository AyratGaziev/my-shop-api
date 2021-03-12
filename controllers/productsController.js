const ShopProduct = require("../models/product.model");
const ShopReviews = require("../models/reviews.model");

class ProductsController {
    async getAllSkipSomeLimited(req, res) {
        const { start, limit } = req.params;

        try {
            const docsCount = await ShopProduct.countDocuments();
            const allProducts = await ShopProduct.find()
                .sort({ price: 1 })
                .skip(+start)
                .limit(+limit);

            if (start + limit === docsCount || allProducts.length < +limit) {
                res.json({ allProducts, done: true });
            } else {
                res.json({ allProducts, done: false });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Ошибка запроса. Товары не найдены"
            });
        }
    }

    async getSomeProdSkipedLimitedSorted(req, res) {
        const { start, limit, category, sort } = req.params;

        try {
            if (category === "allProducts") {
                const docsCount = await ShopProduct.countDocuments();
                const products = await ShopProduct.find()
                    .sort({ price: sort })
                    .skip(+start)
                    .limit(+limit);
                if (+start + +limit === docsCount || products.length < +limit) {
                    res.json({
                        products,
                        done: true,
                        category
                    });
                } else {
                    res.json({
                        products,
                        done: false,
                        category
                    });
                }
            } else {
                const docsCount = await ShopProduct.find({
                    category
                }).countDocuments();

                const products = await ShopProduct.find({ category })
                    .sort({ price: sort })
                    .skip(+start)
                    .limit(+limit);
                if (+start + +limit === docsCount || products.length < +limit) {
                    res.json({
                        products,
                        done: true,
                        category
                    });
                } else {
                    res.json({
                        products,
                        done: false,
                        category
                    });
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Ошибка запроса. Товары не найдены"
            });
        }
    }

    async searchProdSkipedLimited(req, res) {
        const { limit, start, searchText, category, sort } = req.params;

        try {
            const docsCount = await ShopProduct.find({
                name: {
                    $regex: searchText.replace(
                        /[-\/\\^$*+?.()|[\]{}]/g,
                        "\\$&"
                    ),
                    $options: "$i"
                }
            }).countDocuments();

            const products = await ShopProduct.find({
                name: {
                    $regex: searchText.replace(
                        /[-\/\\^$*+?.()|[\]{}]/g,
                        "\\$&"
                    ),
                    $options: "$i"
                }
            })
                .sort({ price: sort })
                .skip(+start)
                .limit(+limit);

            if (+start + +limit === docsCount || products.length < +limit) {
                res.json({
                    products,
                    done: true,
                    category
                });
            } else {
                res.json({
                    products,
                    done: false,
                    category
                });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Ошибка запроса. Товары не найдены"
            });
        }
    }

    async getOneProdById(req, res) {
        const { id } = req.params;

        try {
            const product = await ShopProduct.findOne({ _id: id });
            const reviews = await ShopReviews.find({ prodId: id });
            res.json({
                product,
                reviews
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Ошибка запроса. Товар не найден"
            });
        }
    }

    async addProduct(req, res) {
        const {
            name,
            price,
            discount,
            category,
            subcategory,
            description,
            features,
            img
        } = req.body;

        try {
            const newItem = new ShopProduct({
                name,
                price,
                discount,
                category,
                subcategory,
                description,
                features,
                img
            });
            await newItem.save();
            res.json(`Добавлен:  ${name}`);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Не удалось сохранить"
            });
        }
    }
    async deleteProdById(req, res) {
        const { id } = req.params;

        try {
            const deleted = await ShopProduct.findByIdAndDelete({ _id: id });
            res.json("Deleted" + deleted);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Не удалось удалить"
            });
        }
    }
    async updateProdById(req, res) {
        const { id } = req.params;
        const {
            name,
            price,
            category,
            subcategory,
            description
        } = new ShopProduct(req.body);

        try {
            const updated = await ShopProduct.findByIdAndUpdate(
                { _id: id },
                { name, price, category, subcategory, description }
            );
            res.json("Updated" + updated);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Не удалось обновить"
            });
        }
    }
}
module.exports = new ProductsController();
