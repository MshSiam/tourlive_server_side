const express = require("express")
const { MongoClient } = require("mongodb")
const cors = require("cors")
require("dotenv").config()
const ObjectId = require("mongodb").ObjectId

const app = express()
const port = process.env.PORT || 5000

// set middlewere
app.use(cors())
app.use(express.json())

// connecting database //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.woosd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//  creating Async function //

async function run() {
  try {
    await client.connect()
    const database = client.db("worldTour")
    const tourSpot = database.collection("spots")
    const orders = database.collection("orders")

    //--------GET api (SPOTS)------- //
    app.get("/spots", async (req, res) => {
      const cursor = tourSpot.find({})
      const spots = await cursor.toArray()
      res.send(spots)
    })

    //--------GET api (BOOK)------- //
    app.get("/orders", async (req, res) => {
      const cursor = orders.find({})
    })

    // ------Get a service according to _id------ //
    app.get("/spots/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const spot = await tourSpot.findOne(query)
      res.json(spot)
    })

    // --------POST api------ //
    app.post("/spots", async (req, res) => {
      const spot = req.body
      //   console.log("api hitted", spot)
      const result = await tourSpot.insertOne(spot)
      console.log(result)
      res.json(result)
    })
  } finally {
    //   await client.close()
  }
}

run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("Running Tour Server")
})

app.listen(port, () => {
  console.log("Runnig Tour server on port", port)
})
