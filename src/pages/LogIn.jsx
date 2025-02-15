import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import login1 from "../assets/login1.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const LogIn = () => {
  const navigate = useNavigate(); // ✅ Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    setError({
      email: email.trim() === "",
      password: password.trim() === "",
    });

    if (email.trim() !== "" && password.trim() !== "") {
      console.log("Form Submitted", { email, password });
      // Proceed with authentication logic
    }
  };

  return (
    <>
      <Navbar />
      <div
        className='container d-flex min-vh-100 align-items-center justify-content-center'
        style={{ marginTop: "-90px" }}>
        <div className='row w-100'>
          {/* Left Side Image */}
          <div className='col-md-6 d-flex flex-column align-items justify-content-center'>
            <img src={login1} alt='Tutoring Illustration' className='img-fluid' style={{ marginLeft: "-60px" }} />
          </div>

          {/* Right Side Login Form */}
          <div className='col-md-6 d-flex flex-column justify-content-center'>
            <h2 className='text-success fw-bold'>Welcome Back</h2>
            <p>Sign in to Continue your Journey.</p>
            <form onSubmit={handleSubmit}>
              {/* Phone/Email Field */}
              <div className='mb-3'>
                <label htmlFor='email' className='form-label fw-bold'>
                  Phone/Email<span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  className={`form-control ${error.email ? "border-danger" : ""}`}
                  placeholder='Enter your email or phone'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error.email && <div className='text-danger small mt-1'>This field is required.</div>}
              </div>

              {/* Password Field with Eye Toggle */}
              <div className='mb-3 position-relative'>
                <label htmlFor='password' className='form-label fw-bold'>
                  Password<span className='text-danger'>*</span>
                </label>
                <div className='input-group'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name='password'
                    className={`form-control ${error.password ? "border-danger" : ""}`}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type='button'
                    className='btn border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y'
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}>
                    <i
                      className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                      style={{ fontSize: "1.2rem", color: "#B8860B" }}></i>
                  </button>
                </div>
                {error.password && <div className='text-danger small mt-1'>This field is required.</div>}
              </div>

              {/* Forgot Password Link */}
              <div className='text-end'>
                <a href='#' className='text-decoration-none'>
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type='submit'
                className='btn w-100 mt-3'
                style={{
                  backgroundColor: "rgb(40, 28, 79)",
                  border: "none",
                  color: "white",
                }}>
                Sign In
              </button>
            </form>

            {/* Horizontal OR Separator */}
            <div className='text-center mt-3 d-flex align-items-center justify-content-center'>
              <span className='flex-grow-1 border-bottom'></span>
              <span className='mx-2'>Or</span>
              <span className='flex-grow-1 border-bottom'></span>
            </div>

            {/* Sign Up Button */}
            <button className='btn btn-dark w-100 mt-3' onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
