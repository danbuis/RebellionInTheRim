var mongoose = require("mongoose");

var commanderSchema = mongoose.Schema({
  name: String,
  playerID: String,
  abilities: [Number],
  campaign: String,
  currentPoints: Number,
  fleetSize: Number, 
  faction: String,
  messages: [String],
  initialSkill: {type:Boolean, default:false}
});

commanderSchema.methods.changeName = function(newName){
  this.name = newName
}

commanderSchema.methods.changeFleetSize = function(newSize){
  this.fleetSize = newSize
}

commanderSchema.methods.gainExperience = function(gainXP){
  console.log("commander "+this.name)
  console.log("gaining "+gainXP)
  console.log("total "+this.currentPoints)
  this.currentPoints = this.currentPoints + gainXP
  console.log("total "+this.currentPoints)
}

commanderSchema.methods.addSkill = function(ID, cost){
  var index = this.abilities.indexOf(ID)
  if(index < 0){
    this.abilities.push(ID)
    if(this.initialSkill){
      this.currentPoints = this.currentPoints - cost
    }
    this.initialSkill=true
  }
}

commanderSchema.methods.removeSkill = function(ID){
  var index = this.abilities.indexOf(ID)
  if(index !== -1){
    this.abilities.splice(index, 1)
  }
}

commanderSchema.methods.upgradeSkill = function(currentID, newID, cost){
  var index = this.abilities.indexOf(currentID)
  if(index !== -1){
    this.abilities.splice(index, 1, newID)
    this.currentPoints = this.currentPoints - cost
     } 
}

var Commander = mongoose.model("Commander", commanderSchema);

module.exports = Commander;