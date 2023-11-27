const express = require('express');
const cors = require('cors');
const app=express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port =process.env.PORT  || 5000
//middle ware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_Name}:${process.env.DB_Pass}@cluster0.ej2tmfe.mongodb.net/?retryWrites=true&w=majority`;

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
    const adminCollection=client.db('fitness').collection('admin');
    const usersCollection=client.db('fitness').collection('users');
    const trainersCollection=client.db('fitness').collection('trainers');
    const blogsCollection=client.db('fitness').collection('blogs');
    const newsLetterCollection=client.db('fitness').collection('newsLetter');
    const galleryCollection=client.db('fitness').collection('gallery');
    const timeSlotPricing=client.db('fitness').collection('timeSlotPricing');
    




    app.post('/admin',async(req,res)=>{
      const admin=req.body;
      const result=await adminCollection.insertOne(admin)
      res.send(result)
    })
    app.get('/admin',async(req,res)=>{
      const result=await adminCollection.find().toArray()
      res.send(result)
    })
    app.post('/users',async(req,res)=>{
      const users=req.body;
      const query={email:users.email};
      const existingUser=await usersCollection.findOne(query);
      if(existingUser){
        return res.send({message:'User already added',insertedId:null})
      }
      const result=await usersCollection.insertOne(users)
      res.send(result)
    })
    app.get('/users',async(req,res)=>{
      const result=await usersCollection.find().toArray()
      res.send(result);
    })
    app.post('/trainers',async(req,res)=>{
      const trainers=req.body;
      const result=await trainersCollection.insertOne(trainers)
      res.send(result);
    })
    app.get('/trainers',async(req,res)=>{
      const result=await trainersCollection.find().toArray()
      res.send(result)
    })
    app.get('/trainers/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await trainersCollection.findOne(query)
      res.send(result)
    })
    //get the blogs
    app.get('/blogs',async(req,res)=>{
      const result=await blogsCollection.find().toArray()
      res.send(result)
    })
    //
    app.post('/newsLetter',async(req,res)=>{
      const newsLetter=req.body;
      const result=await newsLetterCollection.insertOne(newsLetter)
      res.send(result);
    })
    app.get('/newsLetter',async(req,res)=>{
      const result=await newsLetterCollection.find().toArray()
      res.send(result)
    })
    //get the image gallery 
    app.get('/gallery',async(req,res)=>{
      const result=await galleryCollection.find().toArray()
      res.send(result)

    })
    //get the time slot pricing
    app.post('/timeSlot',async(req,res)=>{
      const timeSlots=req.body;
      const result=await timeSlotPricing.insertOne(timeSlots)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("Fitness is running")

})
app.listen(port, ()=>{
    console.log("Server is running");
})