var mongoose = require("mongoose");

var commanderSchema = mongoose.Schema({
  name: String,
  playerID: String,
  abilities: [Number]
});



var Commander = mongoose.model("Commander", commanderSchema);

module.exports = Commander;