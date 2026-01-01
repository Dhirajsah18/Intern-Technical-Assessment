import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register or Signup 
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res
      .status(400)
      .json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      return res
      .status(400)
      .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res
    .status(201)
    .json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res
    .status(500)
    .json({ message: "Registration failed" });
  }
};


 // Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
      .status(400)
      .json({ message: "Email and password required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res
      .status(400)
      .json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
      .status(400)
      .json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res
      .status(500)
      .json({ message: "Server error: missing JWT secret" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res
    .status(500)
    .json({ message: "Login failed" });
  }
};
