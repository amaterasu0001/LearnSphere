import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons import
import login1 from "../assets/login1.png"; // Image from Login page

const SignUp = ({ isLightMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const themeClass = isLightMode ? "light-mode" : "dark-mode";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({
      fullName: fullName.trim() === "",
      email: email.trim() === "",
      password: password.trim() === "",
      confirmPassword: confirmPassword.trim() === "" || confirmPassword !== password,
    });

    if (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      confirmPassword === password
    ) {
      console.log("Form Submitted", { fullName, email, password, confirmPassword });
    }
  };

  return (
    <div className={`d-flex flex-column min-vh-100 ${themeClass}`}>
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className={`row w-75 shadow-lg rounded overflow-hidden ${themeClass}`} style={{ maxWidth: "900px" }}>
          {/* Left Side - Image */}
          <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
            <img
              src={login1} // Using the same image from login
              alt="Sign Up Illustration"
              className={`img-fluid ${isLightMode ? "light-image" : "dark-image"}`}
              style={{ maxHeight: "300px", width: "100%", objectFit: "contain" }}
            />
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="col-md-6 p-5">
            <h2 className="text-center mb-3">Create Account</h2>
            <p className="text-center">Join us and start your journey</p>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name*</label>
                <input
                  type="text"
                  className={`form-control ${error.fullName ? "border-danger" : ""}`}
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {error.fullName && <div className="text-danger small mt-1">This field is required.</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input
                  type="email"
                  className={`form-control ${error.email ? "border-danger" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && <div className="text-danger small mt-1">This field is required.</div>}
              </div>

              {/* Password */}
              <div className="mb-3 position-relative">
                <label className="form-label">Password*</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${error.password ? "border-danger" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute password-toggle-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
                {error.password && <div className="text-danger small mt-1">This field is required.</div>}
              </div>

              {/* Confirm Password */}
              <div className="mb-3 position-relative">
                <label className="form-label">Confirm Password*</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${error.confirmPassword ? "border-danger" : ""}`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i
                  className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} position-absolute password-toggle-icon`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
                {error.confirmPassword && <div className="text-danger small mt-1">Passwords do not match or this field is required.</div>}
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea className="form-control" placeholder="Enter your address" rows="3"></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-success w-100 py-2">
                Sign Up
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account? <a href="#" className="text-success">Log In</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3">
        © 2025 LearnSphere. All rights reserved.
      </footer>

      {/* Styles for Light/Dark Mode */}
      <style>
        {`
          .dark-mode {
            background-color: #111;
            color: white;
          }
          .light-mode {
            background-color: #f8f9fa;
            color: black;
          }
          .password-toggle-icon {
            right: 10px;
            top: 38px;
            cursor: pointer;
            color: #bbb;
          }
          /* Image Styles */
          .light-image {
            filter: brightness(1); /* Normal brightness for light mode */
          }
          .dark-image {
            filter: brightness(0.6); /* Darker image for dark mode */
          }
        `}
      </style>
    </div>
  );
};
export default SignUp;