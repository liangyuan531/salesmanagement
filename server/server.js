const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// prevent cross-origin request errors
const cors = require('cors');
const bodyParser = require('body-parser');
// upload pics
const cloudinary = require('cloudinary');
// use mongoose to connect database
const mongoose = require('mongoose');
const routes = require('./routes/');
const router = express.Router()

const url = "mongodb+srv://admin:ezGqnXDQyIpPDrCq@cluster0-a0kj5.mongodb.net/test?retryWrites=true";
mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex: true })
.then(() => { console.log(`Succesfully Connected to the Mongodb Database`)})
.catch(() => { console.log(`Error connecting to the database`)})

cloudinary.config({
  cloud_name: 'detnsjjfu',
  api_key: '878312392973629',
  api_secret: 'LJLoyJjIx_VmWNCIhK5iwKmqr1k'
})

app.use(cors());
app.use(bodyParser.json());

//add routes
routes(router);
app.use('/api', router);

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})