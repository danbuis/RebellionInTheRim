const express = require('express')
const router = express.Router()
const app = require('../../init')

var Campaign = require ('../../models/campaign')
var Commander = require('../../models/commander')
var User = require ('../../models/user')

/*Route for creating a new commander */
router.post("/newCommander", async function(req, res, next){
    var newCommander =  new Commander({
      name: "Default Name",
      playerID: req.body.player,
      campaign: req.body.campaign,
      faction: req.body.faction,
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

    //return app.render(req, res, '/commander', {commander: newCommander, campaign:campaign})
    return res.redirect("/commander/"+newCommander._id)
  })

  /*Router for editing a commander */
  router.post("/edit", async function(req, res, next){
    const commander = await Commander.findById(req.body.commanderID)
    const newName=req.body.newName
    const cleanName = newName.toLowerCase().trim();

    if(cleanName === "none"){
      res.redirect("/error/2")
    }else{
      await commander.changeName(req.body.newName)
      await commander.changeFleetSize(req.body.newSize)
      await commander.save()
      await res.redirect("/commander/"+req.body.commanderID)
    }
  })

  /*Route for handling a form from the skill table */
  router.post("/addSkill", async function(req, res, next){
    const commanderID = req.body.commanderID
    const commander = await Commander.findById(commanderID)

    const campaign = await Campaign.findById(commander.campaign)
    await campaign.addMessage("commander", " has gained the "+req.body.abilityTitle+" ability", commander._id) 
    await campaign.save()

    await commander.addSkill(req.body.abilityID, req.body.cost)
    await commander.save()
    await res.redirect("/commander/"+commanderID)
  })

  /*Route for handling a form from the skill table */
  router.post("/removeSkill", async function(req, res, next){
    const commanderID = req.body.commanderID
    const commander = await Commander.findById(commanderID)

    const campaign = await Campaign.findById(commander.campaign)
    await campaign.addMessage("commander", " has dropped the "+req.body.abilityTitle+" ability", commander._id) 
    await campaign.save()

    await commander.removeSkill(req.body.abilityID)
    await commander.save()
    await res.redirect("/commander/"+commanderID)
  })

  /*Route for handling a form from the skill table */
  router.post("/upgradeSkill", async function(req, res, next){
    const commanderID = req.body.commanderID
    const currentSkillID = req.body.currentSkillID
    const newSkillID = req.body.newSkillID

    const commander = await Commander.findById(commanderID)
    await commander.upgradeSkill(currentSkillID, newSkillID, req.body.cost)
    await commander.save()

    const campaign = await Campaign.findById(commander.campaign)
    await campaign.addMessage("commander", " has upgraded an ability to "+req.body.newSkillTitle, commander._id) 
    await campaign.save()

    await res.redirect("/commander/"+commanderID)
  })

  router.get("/:commanderID", async function(req,res, next){
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

  router.get("/data/:commanderID", async function(req, res, next){
    const commanderID = req.params.commanderID

    const commander = await Commander.findById(commanderID)
    res.json(commander)
  })

module.exports = router