const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db");
const productRouter = require("./routes/Product.route");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({message: "Server is running."})
})
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