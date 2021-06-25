const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fileUpload = require('express-fileupload');


const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/',(req,res) => {
    res.send('Hello World')
})
// console.log(process.env.DB_PASS)

//blogs
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.wthiz.mongodb.net/BlogWebsite?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const blogsCollection = client.db("BlogWebsite").collection("blog");

  //blogs

  app.post('/addBlog',(req, res) =>{
    const newBlog = req.body;
    blogsCollection.insertOne(newBlog)
    .then(result => {
        console.log('inserted ', result.insertedCount)
        res.send(res.insertedCount > 0)
    })  
})


//get and delete
app.get('/blogs',(req,res) => {
    blogsCollection.find()
    .toArray((err,document)=>{
        res.send(document)
    })
})

app.delete('/delete/:id' , (req, res)=> {
    // console.log(req.params.id);
    blogsCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then((err ,result) =>{
      console.log(err);
    })
  })





  
});

app.listen(process.env.PORT || port)