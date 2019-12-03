var mongoose = require("mongoose");

var battleSchema = mongoose.Schema({
  campaign: String,
  attackingCommander: String,
  defendingCommander: String,
  attackingFaction: String,
  defendingFaction: String,
  System: String,
  currentOwnership: String,
  winner: {String, default:""},
  loser: {String, default:""}
});

battleSchema.methods.resolveBattle = function(winningFaction){
  if(winningFaction === attackingFaction){
    this.winner = this.attackingCommander
    this.loser = this.defendingCommander
  }else{
    this.loser = this.attackingCommander
    this.winner = this.defendingCommander
  }
}


var Battle = mongoose.model("Battle", battleSchema);

module.exports = Battle;