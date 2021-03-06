const express = require("express");
const app = express();
const cors = require('cors');
const jwt  = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

//connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxa2g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
  
  try{
     await client.connect();
     console.log("db connected");

     const collection =client.db("doctors-portal").collection("treatments");
     app.get('/services',async(req,res)=>{
        const q = req.query;
        console.log(q);
        const cursor=collection.find(q);
        const result=await cursor.toArray();
        res.send(result);
     })

  }
  finally{

  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Hello from doctors portal");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
