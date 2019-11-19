var mongoose = require("mongoose");

var campaignSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateStarted: {type: Date, default:Date.now },
  dateEnded: Date,
  numberPlayers: Number,
  pendingInvites: [{userID:String, faction:String}],
  messages: [{messageType:String, text:String}],
  rebels: [{playerID:String, commanderID:String}],
  imperials: [{playerID:String, commanderID:String}],
  systems: [{name:String, facility:String}],
  battles: [String]
});

campaignSchema.methods.addPlayer = function(user, faction) {
  console.log("addPlayer "+faction)
  if(faction =="rebel"){
    this.rebels.push({playerID:user, commanderID:"none"})
  }else{
    this.imperials.push({playerID:user, commanderID:"none"})
  }
  console.log("end add player")
};

campaignSchema.methods.invitePlayer = function(userID, faction){
  console.log("inviting")
  console.log(userID)
  console.log(faction)
  console.log(this.pendingInvites)
  this.pendingInvites.push({userID: userID, faction:faction})
  console.log(this.pendingInvites)
}

campaignSchema.methods.removeInvite = function(userID){
  for(var i=0; i<pendingInvites.length; i++){
    if(pendingInvites[i].userID == userID){
      pendingInvites.splice(i, 1)
    }
  }
}

var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;