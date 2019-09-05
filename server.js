const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const flash = require("connect-flash");
const session = require("express-session");

const setUpPassport = require("./setuppassport");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

var User = require ('./models/user')

//connect to MongoDB
mongoose.connect("mongodb+srv://danbuis88:VGXSydm9KdVDvvG@cluster0-ptart.mongodb.net/test?retryWrites=true&w=majority", function(err){
    if (err){
        console.log('NOT CONNECTED TO MONGOOSE')
        console.log(err)
    }else(
        console.log('Connected to mongoose')
    )
})
setUpPassport();

app.prepare().then(() => {
//start express
 const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));

    server.use(session({
        secret: "GH^&fg,.ig*76gHlg",
        resave: true,
        saveUninitialized: true
      }));

    server.use(flash());

    server.use(passport.initialize());
    server.use(passport.session());

    server.post("/login", passport.authenticate("login", {
        successRedirect: "/profile",
        failureRedirect: "/",
        failureFlash: true
    }));

    server.post("/signup", function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;
      
        User.findOne({ username: username }, function(err, user) {
      
          if (err) { return next(err); }
          if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
          }
      
          var newUser = new User({
            username: username,
            password: password
          });
          newUser.save(next);
      
        });
      }, passport.authenticate("login", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true,
        successFlash: 'Welcome'
      }));

    server.get('*', (req, res) => handle(req, res));

 //listen on the port
 server.listen(port, (err) => {
  if (err) throw err;
  console.log(`🤘 on http://localhost:${port}`);
 });
});