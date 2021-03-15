const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(403).json({ message: "Вы не авторизованы" });
            }
            const payload = jwt.verify(token, secret);
            let hasRole = false;
            payload.roles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: "У вас нет доступа" });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json("Пользователь не авторизован");
        }
    };
};
