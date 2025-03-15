import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Chat from "./models/Chat.js";
import process from "process";

dotenv.config();
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Improved CORS setup
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes); // ✅ Fixed import

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// ✅ Socket.IO Handling
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // ✅ Register user socket
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`✅ User ${userId} registered with socket ID ${socket.id}`);
  });

  // ✅ Send message event
  socket.on("sendMessage", async ({ senderEmail, receiverEmail, message }) => {
    if (!senderEmail || !receiverEmail || !message) return;

    try {
      // ✅ Save to MongoDB
      const newMessage = new Chat({ senderEmail, receiverEmail, message });
      await newMessage.save();

      console.log(`✅ Message from ${senderEmail} to ${receiverEmail} stored`);

      // ✅ Emit message after saving
      const receiverSocketId = userSocketMap.get(receiverEmail);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      // ✅ Emit to sender as well
      const senderSocketId = userSocketMap.get(senderEmail);
      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", newMessage);
      }
    } catch (error) {
      console.error("❌ Error storing message:", error);
    }
  });

  // ✅ Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
    for (let [key, value] of userSocketMap) {
      if (value === socket.id) {
        userSocketMap.delete(key);
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
