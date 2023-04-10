const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://pushkar:py123456@cluster0.m6mg9nl.mongodb.net/?retryWrites=true&w=majority";
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
  } finally {
    await client.close();
  }
});

app.listen(5500, () => {
  console.log(`Server started http://localhost:5500`);
});
