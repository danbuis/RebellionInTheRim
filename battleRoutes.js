const express = require('express')
const router = express.Router()

var Campaign = require ('./models/campaign')
var Commander = require('./models/commander')
var Battle = require('./models/battle')

router.post("/newBattle", async function(req,res,next){
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

  router.post("/resolve", async function(req, res, next){
    const battle = await Battle.findById(req.body.battle)
    const campaign = await Campaign.findOne({name:req.body.campaign})

    //update battle status
    await battle.resolveBattle(req.body.winner)
    await battle.save()

    //update System ownership
    await campaign.newSystemOwner(battle)

    //give points to winning team
    if(await battle.winner == battle.attackingCommander){
      await campaign.changeScore(battle.attackingFaction, 1)
    }else await campaign.changeScore(battle.defendingFaction, 1)

    //check if it is time to update the campaign round
    var resolved = 0
    var allResolved = false
    const battleList = await Battle.find({campaign: req.body.campaign, round: campaign.round})
    console.log(battleList.length)
    for(var i=0; i<battleList.length;i++){
      if(await battleList[i].winner == battleList[i].attackingCommander
            || battleList[i].winner == battleList[i].defendingCommander){
        resolved = resolved+1
      }      
    }

    if(await resolved == campaign.rebels.length){allResolved = true}

    if(await allResolved){
      await campaign.changeRound(campaign.round+1)
    }

    //give commanders experience
    const winningCommander = await Commander.findById(battle.winner)
    const losingCommander = await Commander.findById(battle.loser)
    await winningCommander.gainExperience(1)
    await losingCommander.gainExperience(2)

    const fleetDif = await winningCommander.fleetSize - losingCommander.fleetSize
    if(await fleetDif >= 25 ){
      if(await winningCommander.fleetSize < losingCommander.fleetSize){
        await winningCommander.gainExperience(Math.floor(fleetDif/25))
      }else await losingCommander.gainExperience(Math.floor(fleetDif/25))
    }

    await winningCommander.save()
    await losingCommander.save()
    await campaign.save()

    await res.redirect("/battle/" + req.body.battle)
  })

  router.get("/:battleID", async function(req, res, next){
    console.log("in get battle server route")
    const battleID = req.params.battleID
    const battle = await Battle.findById(battleID).catch(console.log("Failed to find battle"))

    return app.render(req,res, '/battle', {battle: battle})
  })

  router.get("/data/:battleID", async function(req,res, next){
    const battleID = req.params.battleID
    const battle = await Battle.findById(battleID)
    res.json(battle)
  })


module.exports = router