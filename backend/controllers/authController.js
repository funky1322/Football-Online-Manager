const User = require("../models/User");
const Team = require("../models/Team");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createInitialTeam } = require("./teamController");

const JWT_SECRET = "X9u5&d7C!pL2ePzF#1kQr8@wTxBmYjAoNvK%3*Gh";

exports.registerOrLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let isNewUser = false;
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
      isNewUser = true;
      createInitialTeam(user._id).catch((err) =>
        console.error("Error creating initial team:", err)
      );
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({
      isNewUser: isNewUser,
      message: "Success",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
