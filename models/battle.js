var mongoose = require("mongoose");

var battleSchema = mongoose.Schema({
  campaign: String,
  round: Number,
  attackingCommander: String,
  defendingCommander: String,
  attackingFaction: String,
  defendingFaction: String,
  System: String,
  systemBonus: Number,
  currentOwnership: String,
  winner: String,
  loser: String
});

battleSchema.methods.resolveBattle = function(winningCommander){
  if(winningCommander === this.attackingCommander){
    this.winner = this.attackingCommander
    this.loser = this.defendingCommander
  }else{
    this.loser = this.attackingCommander
    this.winner = this.defendingCommander
  }
}


var Battle = mongoose.model("Battle", battleSchema);

module.exports = Battle;