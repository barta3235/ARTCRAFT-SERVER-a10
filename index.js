const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


//middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n2g3mj5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const artItemCollection = client.db('artCraftDb').collection('artItem');
    const subCatItem=client.db('artCraftDb').collection('subCatItem');

    app.get('/subcatitem',async(req,res)=>{
      const cursor= subCatItem.find()
      const result=await cursor.toArray();
      res.send(result);
    })

    app.get('/subcatitem/:cat',async(req,res)=>{
      const categoryName= req.params.cat;
      const filter= {subcategory:categoryName};
      const result= await artItemCollection.find(filter).toArray();
      res.send(result);
    })


    app.get('/items', async (req, res) => {
      const cursor = artItemCollection.find();
      const result = await cursor.toArray()
      res.send(result);
    })

    app.get('/itemsbyemail', async (req, res) => {
      const cursor = artItemCollection.find();
      const result = await cursor.toArray()
      res.send(result);
    })

    app.get('/items/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await artItemCollection.findOne(query);
      res.send(result);
    })

    app.get('/itemsbyemail/:email', async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await artItemCollection.find(filter).toArray();
      res.send(result);
    })

    app.post('/items', async (req, res) => {
      const newItem = req.body;
      const result = await artItemCollection.insertOne(newItem)
      res.send(result);
    })

    app.delete('/items/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await artItemCollection.deleteOne(query);
      res.send(result);
    })

    app.put(`/items/:id`, async (req, res) => {
      const id = req.params.id;
      const newData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = {
        $set: {
          imageurl: newData.imageurl,
          itemname: newData.itemname,
          subcategory:newData.subcategory,
          description: newData. description,
          price: newData.price,
          rating:newData.rating,
          processingtime:newData.processingtime,
          stockstatus:newData.stockstatus,
          name:newData.name,
          email:newData.email,
          customization:newData.customization
        }
      }
      const result =await artItemCollection.updateOne(filter,updatedData,options)
      res.send(result);
    })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Server is working');
})

app.listen(port, () => {
  console.log('Server is working')
})
