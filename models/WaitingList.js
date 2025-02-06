const mongoose = require("mongoose");

const WaitingListSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WaitingList", WaitingListSchema);
