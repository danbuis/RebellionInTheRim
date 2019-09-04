const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//connect to MongoDB
mongoose.connect("mongodb+srv://danbuis88:DbuisAndromeda@cluster0-lncyj.mongodb.net/test?retryWrites=true&w=majority", function(err){
    if (err){
        console.log('NOT CONNECTED TO MONGOOSE')
        console.log(err)
    }else(
        console.log('Connected to mongoose')
    )
})

app.prepare().then(() => {
//start express
 const server = express();

 server.use(bodyParser.json());
 server.use(bodyParser.urlencoded({extended: false}));

server.get('*', (req, res) => handle(req, res));

 //listen on the port
 server.listen(port, (err) => {
  if (err) throw err;
  console.log(`🤘 on http://localhost:${port}`);
 });
});