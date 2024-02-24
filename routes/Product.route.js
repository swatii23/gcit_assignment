const express = require("express");

const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/Product.controller");

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", addProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;