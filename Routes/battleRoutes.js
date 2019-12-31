const express = require('express')
const router = express.Router()
const app = require('../init')

var Campaign = require ('../models/campaign')
var Commander = require('../models/commander')
var Battle = require('../models/battle')
var User = require ('../models/user')

router.post("/newBattle", async function(req,res,next){
    Campaign.findById(req.body.campaign, async function(err, campaign){
      if(campaign){
        var attackingFaction
        var defendingFaction
        var attackingCommander
        var defendingCommander

        const getUsername = async player => {
          const user = await User.findById(player.playerID).catch("Failed to find a user in getUserName")
          return await user.username
        } // end of getUsername

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
          systemBonus: req.body.bonus,
          round: campaign.round,
          winner: "none",
          loser: "none"
        })
        
        await newBattle.save()
        await campaign.addBattle(newBattle._id)
        await campaign.save()
        
        await res.redirect("/battle/" + newBattle._id)

      }else if (err){
        return res.redirect("/error/10");
      }
    })  
  })

  router.post("/resolve", async function(req, res, next){
    Battle.findById(req.body.battle, async function(err, battle){
      if(battle){
        Campaign.findOne({name:req.body.campaign}, async function(err, campaign){
          if(campaign){
            //update battle status
            await battle.resolveBattle(req.body.winner)
            await battle.save()

            //check if system had a base

            //update System ownership
            await campaign.newSystemOwner(battle)

            //give points to winning team
            if(await battle.winner == battle.attackingCommander){
              await campaign.changeScore(battle.attackingFaction, 1)
            }else await campaign.changeScore(battle.defendingFaction, 1)

            //check if it is time to update the campaign round
            var resolved = 0
            var allResolved = false
            Battle.find({campaign: req.body.campaign, round: campaign.round}, async function(err, battleList){
              if(battleList){
                for(var i=0; i<battleList.length;i++){
                  if(await battleList[i].winner == battleList[i].attackingCommander
                        || battleList[i].winner == battleList[i].defendingCommander){
                    resolved = resolved+1
                  }      
                }
              }else if (err){
                return res.redirect("/error/10");
              }
            })//end of getting battlelist
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
          }else if (err){
            return res.redirect("/error/10");
          }
        })
      }else if(err){
        return res.redirect("/error/10");
      }
    })
  })

  router.get("/:battleID", async function(req, res, next){
    const battleID = req.params.battleID
    Battle.findById(battleID, function(err, battle){
      if(battle){
        return app.render(req,res, '/battle', {battle: battle})
      }else if(err){
        return res.redirect("/error/10");
      }
    })
  })

  router.get("/data/:battleID", async function(req,res, next){
    const battleID = req.params.battleID
    Battle.findById(battleID, function(err, battle){
      if(battle){
        res.json(battle)
      }else if(err){
        return res.redirect("/error/10");
      }
    })
  })


module.exports = router