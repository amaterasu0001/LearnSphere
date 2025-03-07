import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import process from "process";
import Profile from "../models/Profile.js";
import TutorRequest from "../models/TutorRequest.js";

const router = express.Router();

/* ==========================
✅ SIGNUP ROUTE
========================== */
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("📩 Signup request received:", req.body);

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All fields are required, including role",
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (role !== "student" && role !== "tutor") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role selection" });
    }

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    console.log("✅ User saved successfully:", user);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ LOGIN ROUTE
========================== */
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    if (user.role !== role) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Role mismatch. Please select the correct role.",
        });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        email: user.email,
        name: user.name,
        role: user.role,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ PROFILE UPDATE ROUTE
========================== */
router.post("/profile/update", async (req, res) => {
  console.log("📥 Profile Update Request Data:", req.body);

  const { email, name, role, ...updatedFields } = req.body;

  if (!email || !name || !role) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email, Name, and Role are required for profile update",
      });
  }

  try {
    Object.keys(updatedFields).forEach((key) => {
      if (!updatedFields[key]) delete updatedFields[key];
    });

    console.log("📤 Final Data to Update:", updatedFields);

    let profile = await Profile.findOneAndUpdate(
      { email },
      { $set: { name, role, ...updatedFields } }, // ✅ Ensure `role` is updated
      { new: true, upsert: true }
    );

    console.log("✅ Profile Updated Successfully:", profile);
    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
  } catch (error) {
    console.error("❌ Profile Update Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ TUTOR REQUEST FORM STORAGE
========================== */
router.post("/tutor-request", async (req, res) => {
  try {
    console.log("📥 Tutor Request Data Received:", req.body);

    const {
      studentEmail,
      studentName,
      district,
      area,
      medium,
      studentClass,
      subjects,
      schoolName,
      daysPerWeek,
      studentGender,
      salaryRange,
      tutorGender,
      address,
      mobile,
    } = req.body;

    if (!studentEmail || !studentName) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Name are required!" });
    }


    const tutorRequest = new TutorRequest({
      studentEmail,
      studentName,
      district,
      area,
      medium,
      studentClass,
      subjects,
      schoolName,
      daysPerWeek,
      studentGender,
      salaryRange,
      tutorGender,
      address,
      mobile,
    });

    await tutorRequest.save();
    console.log("✅ Tutor Request Saved Successfully:", tutorRequest);

    res
      .status(201)
      .json({
        success: true,
        message: "Tutor request submitted successfully",
        tutorRequest,
      });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ GET ALL TUTOR REQUESTS
========================== */
router.get("/tutor-requests", async (req, res) => {
  try {
    const tutorRequests = await TutorRequest.find();
    res.status(200).json({ success: true, tutorRequests });
  } catch (error) {
    console.error("❌ Error fetching tutor requests:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

/* ==========================
✅ GET PROFILE DATA
========================== */
router.get("/profile/get", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email is required to fetch profile data",
      });
  }

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

/* ✅ FINAL EXPORT */
export default router;
