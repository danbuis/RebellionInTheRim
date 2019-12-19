const express = require('express');
//const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
var User = require ('./models/user')
const setUpPassport = require("./setuppassport");
const app = require('./init')

var commanderRoutes = require('./Routes/commanderRoutes')
var campaignRoutes = require('./Routes/campaignRoutes')
var battleRoutes = require('./Routes/battleRoutes')
var userRoutes = require('./Routes/userRoutes')

const port = parseInt(process.env.PORT, 10) || 3000;
//const dev = process.env.NODE_ENV !== 'production';
//const app = next({ dev });
const handle = app.getRequestHandler();

//connect to MongoDB
mongoose.connect("mongodb://heroku_tv8w8h8x:4q96fd2jubps28bjf7upeqf8un@ds153766.mlab.com:53766/heroku_tv8w8h8x", {useNewUrlParser: true }, function(err){
    if (err){
        console.log('NOT CONNECTED TO MONGOOSE')
        console.log(err)
    }else(
        console.log('Connected to mongoose')
    )
})
setUpPassport();
//start next
app.prepare().then(() => {
//start express
 const server = express();

    //server.use(morgan('short'))
    server.use(cookieParser());

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(session({
        secret: "GH^&fg,.ig*76gHlg",
        resave: true,
        saveUninitialized: true
      }));
      server.use(bodyParser.json());
      server.use(bodyParser.urlencoded({extended: false}));
    server.use(flash());

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        res.locals.errors = req.flash("error");
        res.locals.infos = req.flash("info");
        next();
      });

    server.use("/commander", commanderRoutes)
    server.use("/campaign", campaignRoutes)
    server.use("/battle", battleRoutes)
    server.use("/user", userRoutes)

    server.post("/login", passport.authenticate("login"), 
      function(req,res){
        
         res.redirect("/user/profile/"+req.user.username);
      });
   
    server.post("/signup", function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;
        var lowercaseUser = username.toLowerCase()
      
        User.findOne({ username: lowercaseUser }, function(err, user) {
      
          if (err) { return next(err); }
          if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/error/7");
          }
      
          var newUser = new User({
            username: lowercaseUser,
            password: password
          });
          newUser.save(next);
      
        });
      }, passport.authenticate("login"), 
        function(req,res){
          res.redirect("/user/profile/"+req.user.username);
        }
      );

    server.get("/error/:errorCode", function(req, res, next){
      const errorCode = req.params.errorCode
      var errorMessage
      switch (errorCode) {
        case '1':
          errorMessage = "User is already participating in that campaign"
          break;
        case '2':
          errorMessage = "Commander name is not allowed"
          break
        case '3':
          errorMessage = "That username is already in use."
          break
        case '4':
          errorMessage = "That user cannot be found, check the spelling"
          break
        case '5' :
          errorMessage = "That campaign name is already in use"
          break
        case '6' :
          errorMessage = "That faction is full"
          break
        case '7' :
          errorMessage = "That username is already taken, try another one."
          break
        case '8' :
          errorMessage = "That username and password cannot be found.  Please ensure it is typed correctly."
          break
        case '9' :
          errorMessage = "You must include a faction when inviting a player"
          break
        case '10' :
          errorMessage = "Database error.  Please try again later."
          break
      }

      return app.render(req,res, '/error', {errorMessage: errorMessage})
    })
  
    server.get('*', (req, res) => handle(req, res));

 //listen on the port
 server.listen(port, (err) => {
  if (err) throw err;
  console.log(`🤘 on http://localhost:${port}`);
 });
});