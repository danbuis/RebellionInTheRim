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

var Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;