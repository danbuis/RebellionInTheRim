const express = require('express')
const router = express.Router()
const app = require('./init')

var User = require ('./models/user')
var Campaign = require ('./models/campaign')

router.get("/profile/:name", function(req, res, next){
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

router.get("/data/:userID", async function(req, res, next){
  const userID = req.params.userID

  const user = await User.findById(userID)
  res.json(user)
})

module.exports = router