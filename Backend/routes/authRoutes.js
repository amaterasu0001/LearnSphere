// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// // Signup Route
// router.post("/signup", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     console.log("Signup request received:", req.body);

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ success: false, message: "All fields are required, including role" });
//     }

//     if (role !== "student" && role !== "tutor") {
//       return res.status(400).json({ success: false, message: "Invalid role selection" });
//     }

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ success: false, message: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, password: hashedPassword, role }); // <-- Fixed this

//     await user.save();
//     console.log("User saved successfully:", user);

//     res.status(201).json({ success: true, message: "User registered successfully" });
//   } catch (error) {
//     console.error("Signup Error:", error.message);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

//     if (user.role !== role) {
//       return res.status(400).json({ success: false, message: "Role mismatch. Please select the correct role." });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });

//     res.status(200).json({ success: true, message: "Login successful", token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// export default router;

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Profile from "../models/Profile.js"; // Import Profile Model

const router = express.Router();

/* ==========================
✅ SIGNUP ROUTE (Register User + Create Profile)
========================== */
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Signup request received:", req.body);

    // Validate inputs
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required, including role" });
    }

    if (role !== "student" && role !== "tutor") {
      return res.status(400).json({ success: false, message: "Invalid role selection" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: "Email already exists" });

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });

    await user.save();

    // ✅ Create a Profile Entry for the User
    const profile = new Profile({
      email,
      name,
      address: "",
      gender: "",
      dateOfBirth: "",
      nationality: "",
      fathersName: "",
      mothersName: "",
    });

    await profile.save();

    console.log("User and Profile saved successfully:", user, profile);

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ LOGIN ROUTE (Authenticate User + Return Token)
========================== */
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Ensure role matches the stored role
    if (user.role !== role) {
      return res.status(400).json({ success: false, message: "Role mismatch. Please select the correct role." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      email: user.email, // Return email so we can fetch profile later
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ PROFILE ROUTE (Fetch Profile Data)
========================== */
router.get("/profile", async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
