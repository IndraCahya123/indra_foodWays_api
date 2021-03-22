const express = require("express");

const router = express.Router();

//Auth middleware
const { authentication } = require("../middleware/Auth");
const { partnerAuth, userAuth } = require("../middleware/roleAuth");
const { uploadImageFile } = require("../middleware/uploadImage");

//register and login
const { userRegister, userLogin } = require("../controller/auth");
router.post("/register", userRegister);
router.post("/login", userLogin);

//users
const { getAllUsers, deleteUser, editUser } = require('../controller/users');

router.get("/users", getAllUsers);
router.delete("/user/:id", authentication, deleteUser);
router.patch("/user/:id", authentication, uploadImageFile("image"), editUser);

//products
const {
    getAllProducts,
    getAllProductsByPartnerId,
    getDetailProduct,
    addNewProduct,
    editProduct,
    deleteProduct,
        } = require('../controller/products');

router.get("/products", getAllProducts);
router.get("/products/:userId", getAllProductsByPartnerId);
router.get("/product/:id", getDetailProduct);
router.post("/product", authentication, partnerAuth, uploadImageFile("image", false), addNewProduct);
router.patch("/product/:productId", authentication, partnerAuth, uploadImageFile("image", true), editProduct);
router.delete("/product/:productId", authentication, partnerAuth, deleteProduct);

//transactions
const { addTransaction,
        deleteTransaction,
        getTransactionsByPartnerId,
        getDetailTransaction,
        editTransaction,
        getMyTransactions,
            } = require("../controller/transactions");

router.post("/transaction", authentication, userAuth, addTransaction);
router.delete("/transaction/:id", authentication, deleteTransaction);
router.get("/transactions/:partnerId", authentication, partnerAuth, getTransactionsByPartnerId);
router.get("/transaction/:id", authentication, getDetailTransaction);
router.patch("/transaction/:id", authentication, editTransaction);
router.get("/my-transactions", authentication, getMyTransactions);

module.exports = router;