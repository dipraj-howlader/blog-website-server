const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



const port = 5000;

app.use(cors());
app.use(bodyParser.json());

console.log(process.env.DB_PASS);

app.get('/',(req,res) => {
    res.send('Hello World')
})


app.listen(process.env.PORT || port)