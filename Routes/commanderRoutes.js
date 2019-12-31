const express = require('express')
const router = express.Router()
const app = require('../init')

var Campaign = require ('../models/campaign')
var Commander = require('../models/commander')
var User = require ('../models/user')

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
    console.log
    User.findById(req.body.player, async function(err, player){
      if(player){
        console.log(req.body)
        Campaign.findById(req.body.campaign, async function(err, campaign){
          if(campaign){
            await campaign.updateCommander(newCommander)
            await campaign.addMessage("commander", player.username + " has created a new commander", "auto")
            await campaign.save()
        
            //return app.render(req, res, '/commander', {commander: newCommander, campaign:campaign})
            return res.redirect("/commander/"+newCommander._id)
          }else if(err){
            return res.redirect("/error/10");
          }
        })
      }else if(err){
        return res.redirect("/error/10");
      }
    })
  })

  /*Router for editing a commander */
  router.post("/edit", async function(req, res, next){
    Commander.findById(req.body.commanderID, async function(err, commander){
      if(commander){
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
      }else if (err){
        return res.redirect("/error/10");
      }
    })  
  })

  /*Route for handling a form from the skill table */
  router.post("/addSkill", async function(req, res, next){
    const commanderID = req.body.commanderID
    Commander.findById(commanderID, async function(err, commander){
      if(commander){
        Campaign.findById(commander.campaign, async function(err, campaign){
          if(campaign){
            const campaign = await Campaign.findById(commander.campaign)
            await campaign.addMessage("commander", " has gained the "+req.body.abilityTitle+" ability", commander._id) 
            await campaign.save()
        
            await commander.addSkill(req.body.abilityID, req.body.cost)
            await commander.save()
            await res.redirect("/commander/"+commanderID)
          }else if (err){
            return res.redirect("/error/10");
          }
        })
      }else if (err){
        return res.redirect("/error/10");
      }
    })
  })

  /*Route for handling a form from the skill table */
  router.post("/removeSkill", async function(req, res, next){
    const commanderID = req.body.commanderID
    Commander.findById(commanderID, async function(err, commander){
      if(commander){
        Campaign.findById(commander.campaign, async function(err, campaign){
          if(campaign){
            const campaign = await Campaign.findById(commander.campaign)
            await campaign.addMessage("commander", " has dropped the "+req.body.abilityTitle+" ability", commander._id) 
            await campaign.save()
        
            await commander.removeSkill(req.body.abilityID)
            await commander.save()
            await res.redirect("/commander/"+commanderID)
          }else if (err){
            return res.redirect("/error/10");
          }
        })
      }else if (err){
        return res.redirect("/error/10");
      }
    })
  })

  /*Route for handling a form from the skill table */
  router.post("/upgradeSkill", async function(req, res, next){
    const commanderID = req.body.commanderID
    const currentSkillID = req.body.currentSkillID
    const newSkillID = req.body.newSkillID

    Commander.findById(commanderID, async function(err, commander){
      if(commander){
        await commander.upgradeSkill(currentSkillID, newSkillID, req.body.cost)
        await commander.save()
  
        Campaign.findById(commander.campaign, async function(err, campaign){
          if(campaign){
            await campaign.addMessage("commander", " has upgraded an ability to "+req.body.newSkillTitle, commander._id) 
            await campaign.save()
        
            await res.redirect("/commander/"+commanderID)
          }else if(err){
            return res.redirect("/error/10");
          }
        })
      }else if(err){
        return res.redirect("/error/10");
      }
    })   
  })

  router.get("/:commanderID", async function(req,res, next){
    const commanderID = req.params.commanderID

    Commander.findById(commanderID, async function(err, commander){
      if(commander){
        //get the campaign this commander is in
        const campaignID = commander.campaign
        const campaign = await Campaign.findById(campaignID)
        return app.render(req, res, '/commander', {commander: commander, campaign:campaign})
      }else if(err){
        return res.redirect("/error/10");
      }
    }) 
  })

  router.get("/data/:commanderID", async function(req, res, next){
    const commanderID = req.params.commanderID

    Commander.findById(commanderID, function(err, commander){
      if(commander){
         res.json(commander)
      }else if(err){
        return res.redirect("/error/10");
      }
    })
  })

module.exports = router