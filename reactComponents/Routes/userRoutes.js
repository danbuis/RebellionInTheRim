const express = require('express')
const router = express.Router()
const app = require('../../init')

var User = require ('../../models/user')
var Campaign = require ('../../models/campaign')

router.get("/profile/:name", function(req, res, next){
  const username = req.params.name
  User.findOne({username: username}, async function(err, user){
    if(user){
      //if user, populate the other required props
      Campaign.find({"rebels.playerID":user._id}, function(err, rebels){
        if(rebels){
          Campaign.find({"imperials.playerID":user._id}, function(err, imperials){
            if(imperials){
              const campaigns = rebels.concat(imperials)
              Campaign.find({"pendingInvites.userID":user._id}, function(err, invites){
                if(invites){
                  return app.render(req, res, '/profile', {user:user, campaigns:campaigns, invites:invites})
                }else if(err){
                  return res.redirect("/error/10");
                }
              })
            }else if(err){
              return res.redirect("/error/10");
            }
          })
        }else if (err){
          return res.redirect("/error/10");
        }
      })
     
    }
    if(err){
      console.log("no user found by that name")
    }
  })
})

router.get("/data/:userID", async function(req, res, next){
  const userID = req.params.userID

  User.findById(userID, function(err, user){
    if(user){
      res.json(user)
    }else if(err){
      return res.redirect("/error/10");
    }
  })
})

module.exports = router