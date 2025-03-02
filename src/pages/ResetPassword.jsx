import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const response = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword }),
    });

    const data = await response.json();
    if (data.success) {
      setMessage("Password reset successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className='reset-container'>
      <h2>Reset Password</h2>
      <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='text' placeholder='Enter recovery code' value={code} onChange={(e) => setCode(e.target.value)} />
      <input
        type='password'
        placeholder='Enter new password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
