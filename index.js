const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello World')
})


app.listen(process.env.PORT || port)