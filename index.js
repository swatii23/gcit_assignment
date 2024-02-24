const express = require("express");
require("dotenv").config();

const { connection } = require("./config/db");
const productRouter = require("./routes/Product.route");

const app = express();
app.use(express.json());

app.use("/products", productRouter);

const port = process.env.PORT || 8080;
app.listen(port, async() => {
    try {
        await connection;
        console.log(`Server is running on port no. ${port}`)
    } catch (error) {
        console.error(`error: ${error}`)
    }
})