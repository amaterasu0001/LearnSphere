import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  transports: ["websocket"],
});

const Chat = () => {
  const { studentId } = useParams(); // This is actually the receiverId (receiver's email)
  const senderEmail = localStorage.getItem("userEmail"); // ✅ Get sender's email
  const receiverEmail = studentId; // ✅ Assign studentId to receiverEmail

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Connect socket and register user
  useEffect(() => {
    if (senderEmail && receiverEmail) {
      socket.emit("register", senderEmail);
      socket.emit("joinRoom", {
        senderEmail,
        receiverEmail,
      });
    }

    // ✅ Receive message via socket
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom(); // ✅ Auto-scroll on new message
    });

    // ✅ Clean up socket connection
    return () => {
      socket.off("newMessage");
    };
  }, [senderEmail, receiverEmail]);

  // ✅ Fetch Chat History
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/chat/${senderEmail}/${receiverEmail}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) setMessages(data.chats);
    } catch (error) {
      console.error("❌ Error fetching messages:", error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [senderEmail, receiverEmail]);

  // ✅ Send Message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderEmail,
      receiverEmail,
      message: newMessage,
    };

    // ✅ Update state immediately
    setMessages((prev) => [
      ...prev,
      {
        senderEmail: messageData.senderEmail,
        receiverEmail: messageData.receiverEmail,
        message: messageData.message,
        createdAt: new Date().toISOString(),
      },
    ]);

    setNewMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat/send`, // ✅ Fixed Template Literal
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        }
      );

      const data = await response.json();

      if (data.success) {
        socket.emit("sendMessage", messageData);
      } else {
        console.error("❌ Server Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
    }
  };

  // ✅ Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={styles.container}>
      {/* ✅ Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          <i>CHATS</i>
        </h2>
      </div>

      {/* ✅ Chat Messages */}
      <div style={styles.messageContainer}>
        {messages.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>
            No messages yet. Start a conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageBubble,
                alignSelf:
                  msg.senderEmail === senderEmail ? "flex-end" : "flex-start",
                backgroundColor:
                  msg.senderEmail === senderEmail ? "#4CAF50" : "#f1f1f1",
                color: msg.senderEmail === senderEmail ? "#ffffff" : "#333333",
              }}
            >
              <p style={styles.messageText}>{msg.message}</p>
              <span style={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
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
    backgroundColor: "#312750",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontStyle: "italic",
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
    backgroundColor: "#312750",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    fontSize: "16px",
  },
};

export default Chat;
