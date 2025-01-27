const Event = require("../models/Event");
const User = require("../models/User");

exports.createEvent = async (req, res) => {
  try {
    const { matchName, date } = req.body;
    const event = await Event.create({ matchName, date });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: "Error creating event", error: err.message });
  }
};

exports.placeBet = async (req, res) => {
  try {
    const { option, amount } = req.body;

    if (amount < 50) return res.status(400).json({ message: "Minimum bet is ₹50" });
    if (!["Yes", "No"].includes(option)) return res.status(400).json({ message: "Invalid option" });

    const user = await User.findById(req.user.id);
    if (user.wallet < amount) return res.status(400).json({ message: "Insufficient wallet balance" });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    user.wallet -= amount;
    await user.save();

    event.bets.push({ userId: req.user.id, option, amount });
    await event.save();

    res.status(200).json({ message: "Bet placed successfully", wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
