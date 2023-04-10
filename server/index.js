const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use("/products", async (req, res) => {
  const { searchQuery } = req.query;
  try {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("Products");
    res.send(
      await products
        .find({
          $or: [
            { brandName: new RegExp(searchQuery, "i") },
            { name: new RegExp(searchQuery, "i") },
            { description: new RegExp(searchQuery, "i") },
          ],
        })
        .limit(10)
        .toArray()
    );
  } catch (error) {
    console.error(error);
  }
});
app.use("/offers", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("ecommerce");
    const offers = database.collection("offers");
    res.send(await offers.find().toArray());
  } catch (error) {
    console.error(error);
  }
});
app.listen(5500, () => {
  console.log(`Server started http://localhost:5500`);
});
