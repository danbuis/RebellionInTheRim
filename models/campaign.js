var mongoose = require("mongoose");

var campaignSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateStarted: {type: Date, default:Date.now },
  dateEnded: Date,
  numberPlayers: Number,
  pendingInvites: [{userID:String, faction:String}],
  messages: [{messageType:String, text:String, source:String}],
  rebels: [{playerID:String, commanderID:String}],
  imperials: [{playerID:String, commanderID:String}],
  systems: [{name:String, facility:String}],
  battles: [String],
  round: {type: Number, default:0}
});

  campaignSchema.methods.newSystemOwner = function(battle){
    //check if the system already has an owner
    var index = -1
    for(var i =0; i<this.systems.length; i++){
      if (this.systems[i].name == battle.System){
        index = i
      }
    }
    //if so, remove it
    if(index >=0){
      this.systems.splice(i,1)
    }
    //and update system with a new owner
    if(battle.winner == battle.attackingCommander){
      this.systems.push({name: battle.System, facility: battle.attackingFaction + "Presence"})
    }else{
      this.systems.push({name: battle.System, facility: battle.defendingFaction + "Presence"})
    }
  }

  campaignSchema.methods.addPlayer = function(user, faction) {
    console.log("addPlayer "+faction)
    if(faction =="rebel"){
      this.rebels.push({playerID:user, commanderID:"none"})
    }else{
      this.imperials.push({playerID:user, commanderID:"none"})
    }
    console.log("end add player")
  }


  campaignSchema.methods.invitePlayer = function(userID, faction){
    this.pendingInvites.push({userID: userID, faction:faction})
  }

  campaignSchema.methods.changeRound = function(newRound){
    this.round = newRound
  }

  campaignSchema.methods.isFull = function(){
    const totalConfirmedPlayers = this.rebels.length + this.imperials.length

    if(totalConfirmedPlayers >= this.numberPlayers) return true
    else return false
  }

  campaignSchema.methods.removeInvite = function(userID){
    for(var i=0; i<this.pendingInvites.length; i++){
      if(this.pendingInvites[i].userID == userID){
        this.pendingInvites.splice(i, 1)
      }
    }
  }
    
  campaignSchema.methods.updateCommander = function(commander){
    const targetPlayer = commander.playerID
    this.rebels.map((player) => {
        if(player.playerID === targetPlayer){
          player.commanderID = commander._id
          return
        }
      }
    )

    this.imperials.map((player) => {
      if(player.playerID === targetPlayer){
        player.commanderID = commander._id
        return
      }
    })
  }

  campaignSchema.methods.addBattle = function(battleID){
    this.battles.push(battleID)
  }


  /*types include things like user communication, player add/drops, battle creation/results, 
  commander creation/promotion, and fleet retirement.

  types: initialization, invite, commander, all, rebel, imperial, battle

  text is the content of the message

  source is the user that created the message, or auto if it is an autogenerated message*/
  campaignSchema.methods.addMessage = function(type, text, source){
    this.messages.push({messageType:type, text:text, source:source})


  }


var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;