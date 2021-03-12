const router = require("express").Router();
const ProductsController = require("../controllers/productsController");

//GET REQUESTS
//GET all products, skip some limited response
router
    .route("/products/limit/:limit/start/:start")
    .get(ProductsController.getAllSkipSomeLimited);
//GET some products, skip some limited response
router
    .route(
        "/products/some/limit/:limit/start/:start/category/:category/sort/:sort"
    )
    .get(ProductsController.getSomeProdSkipedLimitedSorted);
//GET search products, skip some limited response
router
    .route(
        "/products/some/limit/:limit/start/:start/category/:category/sort/:sort/searchText/:searchText"
    )
    .get(ProductsController.searchProdSkipedLimited);
//GET one product by ID
router.route("/products/prodId/:id").get(ProductsController.getOneProdById);

//POST requests
router.route("/products/add").post(ProductsController.addProduct);

//DELETE requests
router.route("/products/del/:id").delete(ProductsController.deleteProdById);

//PATCH requests
router.route("/products/update/:id").patch(ProductsController.updateProdById);

module.exports = router;
