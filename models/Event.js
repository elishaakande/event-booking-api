const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: String,
  totalTickets: Number,
  availableTickets: Number,
  bookedTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  waitingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "WaitingList" }],
});

module.exports = mongoose.model("Event", EventSchema);
