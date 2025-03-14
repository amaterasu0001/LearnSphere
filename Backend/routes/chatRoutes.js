import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// ✅ Save message route
router.post("/send", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newMessage = new Chat({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    res.status(201).json({ success: true, chat: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Fetch chat history route
router.get("/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const chats = await Chat.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

export default router;
