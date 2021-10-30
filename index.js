const express = require("express")
const { MongoClient } = require("mongodb")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

// connecting database //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.woosd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.get("/", (req, res) => {
  res.send("Running Tour Server")
})

app.listen(port, () => {
  console.log("Runnig Tour server on port", port)
})
