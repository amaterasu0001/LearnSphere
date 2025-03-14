import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { studentId } = useParams(); // ✅ Get studentId from params
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
      socket.emit("joinRoom", { senderId: userId, receiverId: studentId });
    }

    // ✅ Fetch existing messages from backend
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat/${userId}/${studentId}`);
        const data = await response.json();
        if (data.success) setMessages(data.chats);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // ✅ Handle incoming messages from socket
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId, studentId]);

  // ✅ Send message to backend and socket
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // ✅ Save to database using API
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          receiverId: studentId,
          message: newMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // ✅ Emit message through socket
        socket.emit("sendMessage", {
          senderId: userId,
          receiverId: studentId,
          message: newMessage,
        });

        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            {msg.senderId === userId ? "You: " : "Student: "} {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
