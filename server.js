const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
var User = require ('./models/user')
var Campaign = require ('./models/campaign')
var Commander = require('./models/commander')
var Battle = require('./models/battle')
const setUpPassport = require("./setuppassport");


const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


//old mongo atlad connection string
//mongodb+srv://danbuis88:VGXSydm9KdVDvvG@cluster0-ptart.mongodb.net/test?retryWrites=true&w=majority

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

    server.post("/login", passport.authenticate("login"), 
      function(req,res){
        
         res.redirect("/profile/"+req.user.username);
      });
   

    server.post("/signup", function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;
        var lowercaseUser = username.toLowerCase().replace(/[\s]/gi,"&nbsp")
      
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
          res.redirect("/profile/"+lowercaseUser);
        }
      );

    server.post("/initCampaign", async function(req, res, next){
        var preprocessedCampaignName = req.body.name;
        var playerCount = req.body.players;
        var faction = req.body.faction;

        var campaignName = preprocessedCampaignName.replace(/[\s]/gi,"&nbsp")

        const campaign = await Campaign.find({name:campaignName})
        if(campaign.length>0){
          return res.redirect("/error/5")
        }else{
          var newCampaign = new Campaign({
            name: campaignName,
            numberPlayers: playerCount
        })

        userID = req.body.user

        await newCampaign.addPlayer(userID, faction)
        await newCampaign.addMessage("initialization", "New campaign begun.  Good luck Admirals!", "auto")
        await newCampaign.save()

        return res.redirect("/campaign/"+campaignName)
        }      
    })

    server.post("/invitePlayer", async function(req, res, next){
      const user = await User.findOne({username:req.body.user});
      if(!user){
        res.redirect("/error/4")
      }else if(req.body.faction == null){
        res.redirect("/error/9")
      }
      else {

        const campaign = await Campaign.findById(req.body.campaign)
                    .catch(console.log("Did not find a campaign"));
        //check if player is already involved in the campaign
        
        var alreadyInvited = false
        var alreadyRebel = false
        var alreadyImperial = false

        var rebelInvites = 0
        var imperialInvites = 0

        campaign.pendingInvites.map(invite => {
           if(invite.userID == user._id){
            alreadyInvited = true
          }
          if(invite.faction == "rebel"){
            rebelInvites++
          }else imperialInvites++
        })

        campaign.rebels.map(player => {
          if(player.playerID == user._id) alreadyInvited = true
        })

        campaign.imperials.map(player => {
          if(player.playerID == user._id) alreadyInvited = true
        })

        var rebelFull = false
        var imperialFull = false

        console.log(rebelInvites)
        console.log(imperialInvites)
        console.log(campaign.rebels.length)

        if(rebelInvites+campaign.rebels.length >= campaign.numberPlayers/2){
          rebelFull = true
        }

        if(imperialInvites + campaign.imperials.length >= campaign.numberPlayers/2){
          imperialFull = true
        }

        if(alreadyInvited || alreadyRebel || alreadyImperial){
          res.redirect("/error/1")
        }else if(rebelFull && req.body.faction =="rebel"){
          res.redirect("/error/6")
        }else if (imperialFull && req.body.faction == "imperial"){
          res.redirect("/error/6")
        }else {
          await campaign.invitePlayer(user._id, req.body.faction);
          await campaign.addMessage("invite", 
                                user.username+" has been invited to join the "+req.body.faction+" team", 
                                "auto")
          await campaign.save()
          await res.redirect("/campaign/"+campaign.name) 
        }
      }
    })

    server.post("/newCommander", async function(req, res, next){
      var newCommander =  new Commander({
        name: "Default Name",
        playerID: req.body.player,
        campaign: req.body.campaign,
        currentPoints: 0,
        fleetSize: 200
      })

      await newCommander.save()
      const player = await User.findById(req.body.player)
          .catch(console.log("could not find player"))

      //update campaign info
      const campaign = await Campaign.findById(req.body.campaign)
          .catch(console.log("Could not find campaign"))

      await campaign.updateCommander(newCommander)
      await campaign.addMessage("commander", player.username + " has created a new commander", "auto")
      await campaign.save()

      console.log("just before redirect "+newCommander._id)
      await console.log("just before redirect "+newCommander._id)

      //return app.render(req, res, '/commander', {commander: newCommander, campaign:campaign})
      return res.redirect("/commander/"+newCommander._id)
    })

    server.post("/changeCommanderName", async function(req, res, next){
      const commander = await Commander.findById(req.body.commanderID)
      const newName=req.body.newName
      const cleanName = newName.toLowerCase().trim().replace(/[\s]/gi,"&nbsp");

      if(cleanName === "none"){
        res.redirect("/error/2")
      }else{
        await commander.changeName(req.body.newName)
        await commander.save()
        await res.redirect("/commander/"+req.body.commanderID)
      }
    })
    
    server.post("/changeCommanderFleetSize", async function(req, res, next){
      const commander = await Commander.findById(req.body.commanderID)
      const newSize=req.body.newSize

      await commander.changeFleetSize(newSize)
      await commander.save()
      await res.redirect("/commander/"+req.body.commanderID)
      
    })

    server.post("/addSkill", async function(req, res, next){
      const commanderID = req.body.commanderID
      const commander = await Commander.findById(commanderID)

      const campaign = await Campaign.findById(commander.campaign)
      await campaign.addMessage("commander", " has gained the "+req.body.abilityTitle+" ability", commander._id) 
      await campaign.save()

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

      const campaign = await Campaign.findById(commander.campaign)
      await campaign.addMessage("commander", " has upgraded an ability to "+req.body.newSkillTitle, commander._id) 
      await campaign.save()

      await res.redirect("/commander/"+commanderID)
    })

    server.get("/campaign/:name", async function(req,res,next){
        const campaignName = req.params.name
        Campaign.findOne({name:campaignName}, async function (err, campaign){
            if(campaign){
              const battles = await Battle.find({campaign:campaign.name})
              return app.render(req, res, '/campaign', {campaign: campaign, battles:battles})
            }
            if(err){
                console.log ("no campaign found with that name")
            }
        })
    })

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
      }

      return app.render(req,res, '/error', {errorMessage: errorMessage})
    })

    server.get("/campaignByID/:campaignID", async function(req,res,next){
      const campaignID = req.params.campaignID
      const campaign = await Campaign.findById(campaignID)

      res.json(campaign)
    })
  
    server.get("/profile/:name", function(req, res, next){
      const username = req.params.name
      User.findOne({username: username}, async function(err, user){
        if(user){
          //if user, populate the other required props
          const rebels = await Campaign.find({"rebels.playerID":user._id})
          const imperials = await Campaign.find({"imperials.playerID":user._id})
          const campaigns = await rebels.concat(imperials)

          const invites = await Campaign.find({"pendingInvites.userID":user._id})
          return app.render(req, res, '/profile', {user:user, campaigns:campaigns, invites:invites})
        }
        if(err){
          console.log("no user found by that name")
        }
      })
    })

    server.get("/battle/:battleID", async function(req, res, next){
      console.log("in get battle server route")
      const battleID = req.params.battleID
      console.log(battleID)
      const battle = await Battle.findById(battleID).catch(console.log("Failed to find battle"))
      await console.log(battle)

      return app.render(req,res, '/battle', {battle: battle})
    })

    server.post("/addBattle", async function(req,res,next){
      const campaign = await Campaign.findById(req.body.campaign)
      
      var attackingFaction
      var defendingFaction
      var attackingCommander
      var defendingCommander

      const getUsername = async player => {
        const user = await User.findById(player.playerID).catch("Failed to find a user in getUserName")
        return await user.username
      }

      //combine campaign player lists
      const playerList = await campaign.rebels.concat(campaign.imperials)
      const userList = await Promise.all(playerList.map(player =>getUsername(player)))

      for(var i=0; i<=playerList.length;i++){
        if(await userList[i] == req.body.assaultingPlayer){
          attackingCommander = playerList[i].commanderID
        }
        else if(await userList[i] == req.body.defendingPlayer){
          defendingCommander = playerList[i].commanderID
        }
      }

      if(req.body.assaultingFaction == "Rebel"){
        attackingFaction = "Rebel"
        defendingFaction = "Empire"
      }else{
        attackingFaction = "Empire"
        defendingFaction = "Rebel"
      }

      var newBattle =  await new Battle({
        campaign: campaign.name,
        attackingCommander: attackingCommander,
        defendingCommander: defendingCommander,
        attackingFaction: attackingFaction,
        defendingFaction: defendingFaction,
        System: req.body.system,
        round: campaign.round,
        winner: "none",
        loser: "none"
      })

      await newBattle.save()
      await campaign.addBattle(newBattle._id)
      await campaign.save()

      await res.redirect("/battle/" + newBattle._id)
    })

    server.post("/battleResolve", async function(req, res, next){
      const battle = await Battle.findById(req.body.battle)

      await battle.resolveBattle(req.body.winner)
      await battle.save()

      await res.redirect("/battle/" + req.body.battle)
    })

    server.get("/user/:userID", async function(req, res, next){
      const userID = req.params.userID

      const user = await User.findById(userID)
      res.json(user)
    })

    server.get("/battleData/:battleID", async function(req,res, next){
      const battleID = req.params.battleID
      const battle = await Battle.findById(battleID)
      res.json(battle)
    })

    server.post("/acceptInvite", async function(req, res, next){
      const user = req.body.user
      const faction = req.body.faction
      const campaignName = req.body.campaign

      const userData = await User.findById(user)
      const campaign = await Campaign.findOne({name:campaignName})

      //add the player
      await campaign.addPlayer(user, faction)

      //remove the invite
      await campaign.removeInvite(user)
      await campaign.addMessage("invite", userData.username+" has joined this campaign", "auto")
      const full = await campaign.isFull()
      if(full){
        await campaign.changeRound(campaign.round + 1)
      }

      //save the changes
      await campaign.save()

      await res.redirect("/campaign/"+campaign.name)

    })

    server.post("/declineInvite", async function(req, res, next){
      const user = req.body.user
      const campaignName = req.body.campaign

      const campaign = await Campaign.findOne({name:campaignName})
      const userData = await User.findById(user)
      await campaign.removeInvite(user)

      await campaign.addMessage("invite", userData.username+" has declined the invite to join this campaign", "auto")
      //save the changes
      await campaign.save()

      

      await res.redirect("/profile/"+userData.username)
    })

    server.get("/commanderData/:commanderID", async function(req, res, next){
      const commanderID = req.params.commanderID

      const commander = await Commander.findById(commanderID)
      res.json(commander)
    })

    server.get("/commander/:commanderID", async function(req,res, next){
      console.log("next server method")
      const commanderID = req.params.commanderID

      const commander = await Commander.findById(commanderID)
      if(commander){
        //get the campaign this commander is in
        const campaignID = commander.campaign
        const campaign = await Campaign.findById(campaignID)
        console.log("just before render")
        return app.render(req, res, '/commander', {commander: commander, campaign:campaign})
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