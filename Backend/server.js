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
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// ✅ Socket.IO Handling
io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on("register", (userId) => {
    socket.join(userId);
  });

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    socket.join(`${senderId}-${receiverId}`);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      // ✅ Save to MongoDB
      const chat = new Chat({ senderId, receiverId, message });
      await chat.save();

      // ✅ Emit message to both users
      io.to(`${senderId}-${receiverId}`).emit("newMessage", chat);
      io.to(`${receiverId}-${senderId}`).emit("newMessage", chat);

      console.log(`✅ Message stored and sent: ${message}`);
    } catch (error) {
      console.error("❌ Error storing message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
