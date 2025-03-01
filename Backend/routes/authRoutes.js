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
    // const profile = new Profile({
    //   email,
    //   name,
    //   location: req.body.location || null,
    //   address: req.body.address || null,
    //   gender: req.body.gender || null,
    //   additionalNumber: req.body.additionalNumber || null,
    //   dateOfBirth: req.body.dateOfBirth || null,
    //   nationality: req.body.nationality || null,
    //   fathersName: req.body.fathersName || null,
    //   mothersName: req.body.mothersName || null,
    //   religion: req.body.religion || null,
    //   birthCertificateNo: req.body.birthCertificateNo || null,
    //   facebookProfileLink: req.body.facebookProfileLink || null,
    //   linkedInProfileLink: req.body.linkedInProfileLink || null,
    //   fathersNumber: req.body.fathersNumber || null,
    //   mothersNumber: req.body.mothersNumber || null,
    // });

    //await profile.save();

    console.log("User saved successfully:", user);

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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    if (user.role !== role) {
      return res.status(400).json({ success: false, message: "Role mismatch. Please select the correct role." });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      email: user.email,
      name: user.name, // ✅ Send user name
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ PROFILE ROUTE (Fetch Profile Data)
========================== */
router.post("/profile/update", async (req, res) => {
  console.log("➡️ Received Data:", req.body);

  const { email, name, ...updatedFields } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: "Email and Name are required for profile update" });
  }

  try {
    // ✅ Remove empty fields before updating
    Object.keys(updatedFields).forEach((key) => {
      if (!updatedFields[key]) delete updatedFields[key];
    });

    console.log("➡️ Final Data to Update:", updatedFields);

    let profile = await Profile.findOne({ email });

    if (!profile) {
      profile = new Profile({ email, name, ...updatedFields });
      await profile.save();
      console.log("✅ Profile Created Successfully:", profile);
      return res.status(201).json({ success: true, message: "Profile created successfully", profile });
    }

    profile = await Profile.findOneAndUpdate(
      { email },
      { $set: { name, ...updatedFields } }, // ✅ Ensure `name` is updated
      { new: true, upsert: true }
    );

    console.log("✅ Profile Updated Successfully:", profile);
    res.status(200).json({ success: true, message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("❌ Profile Update Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

router.get("/profile/get", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required to fetch profile data" });
  }

  try {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
