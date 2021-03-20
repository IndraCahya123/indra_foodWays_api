const express = require("express");

const router = express.Router();

//register and login
const { userRegister, userLogin } = require("../controller/auth");
router.post("/register", userRegister);
router.post("/login", userLogin);

//users
const { getAllUsers, deleteUser } = require('../controller/users');

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);

//products
const {
    getAllProducts,
    getAllProductsByPartnerId,
    getDetailProduct,
        } = require('../controller/products');

router.get("/products", getAllProducts);
router.get("/products/:userId", getAllProductsByPartnerId);
router.get("/product/:id", getDetailProduct);

module.exports = router;