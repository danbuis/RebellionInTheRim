var mongoose = require("mongoose");

var commanderSchema = mongoose.Schema({
  name: String,
  playerID: String,
  abilities: [Number],
  campaign: String,
  currentPoints: Number,
  fleetSize: Number, 
  faction: String
});

commanderSchema.methods.changeName = function(newName){
  this.name = newName
}

commanderSchema.methods.changeFleetSize = function(newSize){
  this.fleetSize = newSize
}

commanderSchema.methods.addSkill = function(ID){
  var index = this.abilities.indexOf(ID)
  if(index < 0){
    this.abilities.push(ID)
  }
}

commanderSchema.methods.upgradeSkill = function(currentID, newID){
  var index = this.abilities.indexOf(currentID)
  if(index !== -1){
    this.abilities.splice(index, 1, newID)
     } 
}

var Commander = mongoose.model("Commander", commanderSchema);

module.exports = Commander;