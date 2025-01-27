const User = require("../models/User");

exports.depositToWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.user.id);
    user.wallet += amount;
    await user.save();

    res.status(200).json({ message: "Money added to wallet", wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
