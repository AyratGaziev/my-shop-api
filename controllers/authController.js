const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// const { secret } = require("../config");

require("dotenv").config();

const secret = process.env.SECRET;

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка регистрации", errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: "Пользователь уже есть" });
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({ value: "CUSTOMER" });
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value]
            });
            await user.save();
            return res.json({
                message:
                    "Вы зарегистрированы. Теперь можете войти под своим логином паролем"
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Пользователь не найден" });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Неправильный пароль" });
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({
                id: user._id,
                name: user.username,
                role: user.roles,
                token
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async isAuth(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(403).json("Пользователь не авторизован");
            }
            const decodedData = jwt.verify(token, secret);
            const user = await User.findOne({ _id: decodedData.id });
            return res.json({
                id: user._id,
                name: user.username,
                role: user.roles
            });
        } catch (e) {
            console.log(e);
            return res.status(403).json("Пользователь не авторизован");
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "getUsers error" });
        }
    }
}
module.exports = new AuthController();
