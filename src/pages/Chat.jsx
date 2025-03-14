import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { studentId } = useParams();
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
      socket.emit("joinRoom", { senderId: userId, receiverId: studentId });
    }

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

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom(); // ✅ Auto-scroll on new message
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId, studentId]);

  // ✅ Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Send Message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
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
    <div style={styles.container}>
      {/* ✅ Updated Header Text */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          {" "}
          <i>CHATS</i>
        </h2>{" "}
        {/* ✅ Italic format */}
      </div>

      {/* ✅ Chat Messages */}
      <div style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageBubble,
              alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
              backgroundColor: msg.senderId === userId ? "#4CAF50" : "#f1f1f1",
              color: msg.senderId === userId ? "#ffffff" : "#333333",
            }}
          >
            <p style={styles.messageText}>{msg.message}</p>
            <span style={styles.timestamp}>
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        {/* ✅ Invisible div to auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ Input Field */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  header: {
    padding: "16px",
    backgroundColor: "#312750", // ✅ Changed to extracted color
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontStyle: "italic", // ✅ Italic format
  },
  messageContainer: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  messageBubble: {
    padding: "12px 16px",
    borderRadius: "18px",
    maxWidth: "70%",
    wordWrap: "break-word",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  messageText: {
    fontSize: "16px",
    margin: 0,
  },
  timestamp: {
    fontSize: "12px",
    color: "#bbb",
    alignSelf: "flex-end",
  },
  inputContainer: {
    display: "flex",
    padding: "12px",
    backgroundColor: "#f1f1f1",
    borderTop: "1px solid #ddd",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#000",
    transition: "border-color 0.2s",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#312750", // ✅ Changed to extracted color
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#4e3c71",
    },
  },
};

export default Chat;
