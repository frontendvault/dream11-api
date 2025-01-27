const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  matchName: { type: String, required: true },
  date: { type: Date, required: true },
  bets: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      option: { type: String, enum: ["Yes", "No"], required: true },
      amount: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Event", EventSchema);
