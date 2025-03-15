import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// ✅ Save message route (POST)
router.post("/send", async (req, res) => {
  const { senderEmail, receiverEmail, message } = req.body;

  if (!senderEmail || !receiverEmail || !message) {
    console.log("❌ Missing fields:", req.body); // ✅ Improved logging
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // ✅ Save to MongoDB
    const newMessage = new Chat({
      senderEmail,
      receiverEmail,
      message,
    });

    await newMessage.save();

    console.log(`✅ Message saved from ${senderEmail} to ${receiverEmail}`); // ✅ Fixed template literal

    res.status(201).json({ success: true, chat: newMessage });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Fetch chat history using emails
router.get("/:senderEmail/:receiverEmail", async (req, res) => {
  const { senderEmail, receiverEmail } = req.params;

  try {
    const chats = await Chat.find({
      $or: [
        { senderEmail, receiverEmail },
        { senderEmail: receiverEmail, receiverEmail: senderEmail },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
