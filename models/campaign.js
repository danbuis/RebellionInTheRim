var mongoose = require("mongoose");

var campaignSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateStarted: {type: Date, default:Date.now },
  dateEnded: Date,
  numberPlayers: Number,
  pendingInvites: [Object],
  messages: [Object],
  rebels: [String],
  imperials: [String],
  systems: [Object],
  battles: [Object]
});

campaignSchema.methods.addPlayer = function(userID, faction) {
  if(faction==="rebels"){
    this.rebels.push(userID)
  }else{
    this.imperials.push(userID)
  }
};

var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;