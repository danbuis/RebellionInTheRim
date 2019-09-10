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
  console.log(faction)
  if(faction =="rebel"){
    this.rebels.push(userID)
  }else{
    this.imperials.push(userID)
  }

  //add the campaign to the players list
  User.findById(id, function(err, user) {
    if(user){
      user.addCampaign(this._id)
    }
  });
};

var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;