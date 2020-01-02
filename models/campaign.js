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
  systems: [{name:String, facility:String, faction:String}],
  rebelBases: Number,
  imperialBases: Number,
  battles: [String],
  round: {type: Number, default:-1},
  scoreRebel: [Number],
  scoreImperial: [Number],
  act:{type: Number, default:0}
});

  campaignSchema.methods.upgradeToBase = function(systemName, faction){
    //check if the system already has a presence
    var index = -1
    for(var i =0; i<this.systems.length; i++){
      if (this.systems[i].name == systemName){
        index = i
      }
    }
    if(index >= 0){
      this.systems[index].facility="Base"
    }else{
      this.systems.push({name: systemName, facility:"Base", faction:faction})
    }

    this.tallyBases()
  }

  campaignSchema.methods.tallyBases = function(){
    var rebel = 0
    var imp = 0

    this.systems.map(system => {
      if(system.facility == "Base"){
        if(system.faction == "Rebel"){
          rebel ++
        }else imp++
      }
    })

    this.rebelBases = rebel
    this.imperialBases = imp
  }

  campaignSchema.methods.removeBase = function(systemName){
    var index = -1
    for(var i =0; i<this.systems.length; i++){
      if (this.systems[i].name == systemName){
        index = i
      }
    }
    //if so, remove it
    if(index >=0){
      this.systems.splice(index,1)
    }

    this.tallyBases()
  }

  campaignSchema.methods.newSystemOwner = function(battle){

    //get winning faction
    var winningFaction
    if(battle.attackingCommander == battle.winner){
      winningFaction = battle.attackingFaction
    }else winningFaction = battle.defendingFaction

    //check if the system already has an owner
    var index = -1
    for(var i =0; i<this.systems.length; i++){
      if (this.systems[i].name == battle.System){
        index = i
      }
    }
    //if so...
    if(index >= 0){
      const system = this.systems[index]
      if(system.facility == "Base"){
        console.log("this is a base")
        //if defender won
        if(winningFaction == battle.defendingFaction){
          //then return, no ownership change, don't want to downgrade base to a presence
          console.log("defender won, no change to ownership")
          return
        }else{
          //assign bonus points to winningFaction for defeating a base
          console.log("winner earns "+battle.systemBonus+" bonus points")
          this.changeScore(winningFaction, battle.systemBonus)
        }
      }
      this.systems.splice(index,1)
    }

    //and update system with a new owner
    if(battle.winner == battle.attackingCommander){
      this.systems.push({name: battle.System, facility:"Presence", faction:winningFaction})
    }else{
      this.systems.push({name: battle.System, facility:"Presence", faction:winningFaction})
    }

    this.tallyBases()
  }

  campaignSchema.methods.changeScore = function(faction, addedPoints){
    const currentAct = this.scoreRebel.length
    if(faction == "Rebel"){
      const currentScore = this.scoreRebel[currentAct-1]
      this.scoreRebel.set(currentAct - 1 , currentScore + addedPoints)
    } else {
      const currentScore = this.scoreImperial[currentAct-1]
      this.scoreImperial.set(currentAct-1, currentScore + addedPoints)
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
    console.log("inside changeRound "+newRound)
    this.round = newRound

    var scoreThreshold
    if(this.numberPlayers = 6) scoreThreshold=5
    else scoreThreshold=4

    console.log("scoreThreshold "+scoreThreshold)
    //console.log("scoreRebel "+this.score.rebel +" : "+this.score.rebel[this.act-1])
    //console.log("scoreEmpire "+this.score.empire +" : "+this.score.empire[this.act-1])

    if(newRound!=1 && (this.scoreRebel[this.act-1] >= scoreThreshold || this.scoreImperial[this.act-1] >= scoreThreshold)){
      this.nextAct()
    }


  }

  campaignSchema.methods.nextAct = function(){
    this.act = this.act+1
    this.scoreRebel.push(0)
    this.scoreImperial.push(0)
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