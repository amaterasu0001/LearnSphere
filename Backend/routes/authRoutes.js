import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Signup request received:", req.body);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required, including role" });
    }

    if (role !== "student" && role !== "tutor") {
      return res.status(400).json({ success: false, message: "Invalid role selection" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role }); // <-- Fixed this

    await user.save();
    console.log("User saved successfully:", user);
    
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    if (user.role !== role) {
      return res.status(400).json({ success: false, message: "Role mismatch. Please select the correct role." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });

    res.status(200).json({ success: true, message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
