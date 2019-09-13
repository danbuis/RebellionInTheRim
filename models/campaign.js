var mongoose = require("mongoose");
var User = require ('../models/user')

var campaignSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateStarted: {type: Date, default:Date.now },
  dateEnded: Date,
  numberPlayers: Number,
  pendingInvites: [{userID:String, faction:String}],
  messages: [String],
  messageTypes: [String],
  rebels: [String],
  imperials: [String],
  systemNames: [String],
  systemOwnership: [String],
  battles: [String]
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
  console.log("inviting")
  console.log(userID)
  console.log(faction)
  console.log(this.pendingInvites)
  this.pendingInvites.push({userID: userID, faction:faction})
  console.log(this.pendingInvites)
  this.save()
}

var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;