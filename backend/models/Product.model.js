const mongoose = require("mongoose");

const productScheme = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    currency: {type: String, required: true}
})

const ProductModel = mongoose.model("Product", productScheme);

module.exports = ProductModel;