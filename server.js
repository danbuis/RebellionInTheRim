const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const setUpPassport = require("./setuppassport");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

var User = require ('./models/user')
var Campaign = require ('./models/campaign')
var Commander = require('./models/commander')

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

    server.post("/login", passport.authenticate("login"), 
      function(req,res){
         // console.log("logging in")
         // console.log(req.user)
         res.redirect("/profile/"+req.user.username);
        //res.redirect("/commander");
      });
   

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
      }, passport.authenticate("login"), 
        function(req,res){
          res.redirect("/profile/"+req.user.username);
        }
      );

    server.post("/initCampaign", function(req, res, next){
        var campaignName = req.body.name;
        var playerCount = req.body.players;
        var faction = req.body.faction;

        var newCampaign = new Campaign({
            name: campaignName,
            numberPlayers: playerCount
        })

        userID = req.body.user

        newCampaign.addPlayer(userID, faction)
        newCampaign.addMessage("initialization", "New campaign begun.  Good luck Admirals!", "auto")
        newCampaign.save(next)

        return res.redirect("campaign/"+campaignName)
    })

    server.post("/invitePlayer", async function(req, res, next){
      console.log("inside server route looking for user "+req.body.user)

      const user = await User.findOne({username:req.body.user});

      console.log("inside server route looking for campaign "+req.body.campaign)
      const campaign = await Campaign.findById(req.body.campaign);

      await campaign.invitePlayer(user._id, req.body.faction);
      await campaign.addMessage("invite", 
                            user.username+" invited to join the "+req.body.faction+" team", 
                            "auto")
      await campaign.save()
      await res.redirect("/campaign/"+campaign.name) 
    })

    server.get("/newCommander/:player/:campaign", async function(req, res, next){
      console.log("in server method")
      var newCommander = new Commander({
        name: "Default Name",
        playerID: req.params.player,
        campaign: req.params.campaign,
        currentPoints: 0
      })

      newCommander.save(next)

      //update campaign info
      const campaign = await Campaign.findById(req.params.campaign)
      await campaign.updateCommander(newCommander)
      await campaign.save()
      return res.redirect("/commander/"+newCommander._id)
    })

    server.post("/changeCommanderName", async function(req, res, next){
      const commander = await Commander.findById(req.body.commanderID)

      await commander.changeName(req.body.newName)
      await commander.save()
      await res.redirect("/commander/"+req.body.commanderID)
    })

    server.post("/addSkill", async function(req, res, next){
      const commanderID = req.body.commanderID
      console.log(commanderID)
      const commander = await Commander.findById(commanderID)
      console.log(commander)
      await commander.addSkill(req.body.abilityID)
      await commander.save()
      await res.redirect("/commander/"+commanderID)
    })

    server.post("/upgradeSkill", async function(req, res, next){
      const commanderID = req.body.commanderID
      const currentSkillID = req.body.currentSkillID
      const newSkillID = req.body.newSkillID

      const commander = await Commander.findById(commanderID)
      await commander.upgradeSkill(currentSkillID, newSkillID)
      await commander.save()
      await res.redirect("/commander/"+commanderID)
    })

    server.get("/campaign/:name", function(req,res,next){
        const campaignName = req.params.name
        Campaign.findOne({name:campaignName}, function (err, campaign){
            if(campaign){
                return app.render(req, res, '/campaign', {campaign: campaign})
            }
            if(err){
                console.log ("no campaign found with that name")
            }
        })
    })

    server.get("/campaignByID/:campaignID", async function(req,res,next){
      const campaignID = req.params.campaignID
      const campaign = await Campaign.findById(campaignID)

      res.json(campaign)
      })
  
    server.get("/profile/:name", function(req, res, next){
      const username = req.params.name
      //console.log (req)
      User.findOne({username: username}, function(err, user){
        if(user){
          return app.render(req, res, '/profile', {user:user})
        }
        if(err){
          console.log("no user found by that name")
        }
      })
    })

    server.get("/participatingCampaigns/:userID", async function(req, res, next){
      const userID = req.params.userID
      const rebels = await Campaign.find({"rebels.playerID":userID})
      const imperials = await Campaign.find({"imperials.playerID":userID})
      console.log(rebels)
      var total= await rebels.concat(imperials)
      res.json(total)
    })

    server.get("/invites/:userID", async function(req, res, next){
      const user = req.params.userID

      const invites = await Campaign.find({"pendingInvites.userID":user})
      console.log(invites)
      res.json(invites)
    })

    server.get("/user/:userID", async function(req, res, next){
      const userID = req.params.userID

      const user = await User.findById(userID)
      res.json(user)
    })

    server.get("/commanderData/:commanderID", async function(req, res, next){
      const commanderID = req.params.commanderID

      const commander = await Commander.findById(commanderID)
      res.json(commander)
    })

    server.get("/commander/:commanderID", async function(req,res, next){
      const commanderID = req.params.commanderID

      const commander = await Commander.findById(commanderID)
      if(commander){
        return app.render(req, res, '/commander', {commander: commander})
      }
      if(err){
          console.log ("no commander found with that ID")
      }
    })

    server.get('*', (req, res) => handle(req, res));

 //listen on the port
 server.listen(port, (err) => {
  if (err) throw err;
  console.log(`🤘 on http://localhost:${port}`);
 });
});