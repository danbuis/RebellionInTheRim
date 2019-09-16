var mongoose = require("mongoose");

var commanderSchema = mongoose.Schema({
  name: String,
  playerID: String,
  abilities: [String]
});



var Commander = mongoose.model("Commander", commanderSchema);

module.exports = Commander;