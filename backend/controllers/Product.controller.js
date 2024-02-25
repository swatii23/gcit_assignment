const ProductModel = require("../models/Product.model")

const getProducts = async (req, res) => {
    try {
      const { sort, order, filter, q } = req.query;
  
      let query = {};
      let sortQuery = {};
      let sortOrder;
  
      if (sort) {
        sortOrder = order === "desc" ? -1 : 1;
        sortQuery[sort] = sortOrder;
      }
  
      if (filter) {
        query = { ...query, name: { $regex: filter, $options: 'i' } };
      }
  
      if (q) {
        query = { ...query, name: { $regex: `^${q}`, $options: 'i' } };
      }
  
      const products = await ProductModel.find(query).sort(sortQuery);
      res.status(200).json({ products });
    } catch (error) {
      console.log(`error: ${error}`);
      res.status(500).send({ error: "internal server error" });
    }
  };
  

const addProduct = async(req, res) => {
    try {
        const product = req.body;

        await ProductModel.create(product);
        res.status(201).send({success: "product added successfully."})
    } catch (error) {
        console.log(`error: ${error}`)
        res.status(500).send({error: "internal server error"})
    }
}

const updateProduct = async(req, res) => {
    try {
        const _id = req.params.id;
        const product = req.body;

        await ProductModel.findByIdAndUpdate(_id, product);

        res.status(200).send({success: "product updated successfully."})

    } catch (error) {

        console.log(`error: ${error}`)
        res.status(500).send({error: "internal server error"})

    }
}

const deleteProduct = async(req, res) => {
    try {
        const _id = req.params.id;

        await ProductModel.findByIdAndDelete(_id);

        res.status(200).send({success: "product deleted successfully."})

    } catch (error) {

        console.log(`error: ${error}`)
        res.status(500).send({error: "internal server error"})

    }
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
}