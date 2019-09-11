var mongoose = require("mongoose");
var User = require ('../models/user')

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
  console.log(faction)
  if(faction =="rebel"){
    this.rebels.push(userID)
  }else{
    this.imperials.push(userID)
  }
};

campaignSchema.methods.invitePlayer = function(userID, faction){
  this.pendingInvites.push(
    {
      user: userID,
      faction: faction
    }
  )
}

var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;