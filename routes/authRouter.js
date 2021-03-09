const router = require("express").Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
    "/registration",
    [
        check("username", "Имя пользователя не может быть пустым").notEmpty(),
        check("password", "Пароль не может быть пустым").notEmpty(),
        check(
            "password",
            "Пароль не может быть меньше 6 символов и больше 10"
        ).isLength({ min: 6, max: 10 })
    ],
    authController.registration
);
router.post("/login", authController.login);
router.get("/isAuth", authController.isAuth);
router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

module.exports = router;
