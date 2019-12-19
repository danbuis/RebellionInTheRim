const express = require('express')
const router = express.Router()
const app = require('../../init')

var Campaign = require ('../../models/campaign')
var Battle = require('../../models/battle')
var User = require ('../../models/user')

router.post("/newCampaign", async function(req, res, next){
  var campaignName = req.body.name;
  var playerCount = req.body.players;
  var faction = req.body.faction;

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

router.post("/invitePlayer", async function(req, res, next){
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

router.post("/acceptInvite", async function(req, res, next){
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
    await campaign.changeRound(1)
    await campaign.nextAct()
  }

  //save the changes
  await campaign.save()

  await res.redirect("/campaign/"+campaign.name)

})

router.post("/declineInvite", async function(req, res, next){
  const user = req.body.user
  const campaignName = req.body.campaign

  const campaign = await Campaign.findOne({name:campaignName})
  const userData = await User.findById(user)
  await campaign.removeInvite(user)

  await campaign.addMessage("invite", userData.username+" has declined the invite to join this campaign", "auto")
  //save the changes
  await campaign.save()

  await res.redirect("/user/profile/"+userData.username)
})

router.get("/data/:campaignID", async function(req,res,next){
  const campaignID = req.params.campaignID
  const campaign = await Campaign.findById(campaignID)

  res.json(campaign)
})

router.get("/:name", async function(req,res,next){
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


module.exports = router