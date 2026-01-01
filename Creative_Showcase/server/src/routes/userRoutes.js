import express from "express";
import User from "../models/User.js";
import Image from "../models/Image.js";

const router = express.Router();

// Public user profile
router.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res
      .status(404)
      .json({ message: "User not found" });
    }

    const images = await Image.find({ user: user._id })
      .sort({ createdAt: -1 });

    res.json({ user, images });
  } catch (err) {
    res
    .status(500)
    .json({ message: "Server error" });
  }
});

export default router;
