var mongoose = require("mongoose");

var commanderSchema = mongoose.Schema({
  name: String,
  playerID: String,
  abilities: [Number],
  campaign: String,
  currentPoints: Number
});

commanderSchema.methods.changeName = function(newName){
  this.name = newName
}

commanderSchema.methods.addSkill = function(ID){
  this.abilities.push(ID)
}

commanderSchema.methods.upgradeSkill = function(currentID, newID){
  console.log("current "+currentID)
  console.log("new "+newID)

  var index = this.abilities.indexOf(currentID)
  console.log("index "+index)
  if(index !== -1){
    console.log(this.abilities)
    console.log(this.abilities[index])
    console.log(newID)
    this.abilities.splice(index, 1, newID)
    console.log("end of method")
    } 
}

var Commander = mongoose.model("Commander", commanderSchema);

module.exports = Commander;