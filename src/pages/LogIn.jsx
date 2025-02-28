import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import login1 from "../assets/login1.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/login"; // Importing API function

const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Role selection state
  const [error, setError] = useState({ email: false, password: false, role: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: email.trim() === "", password: password.trim() === "", role: role === "" });

    if (email.trim() !== "" && password.trim() !== "" && role !== "") {
      try {
        const result = await login({ email, password, role }); // Ensure role is included

        if (result.success) {
          if (result.role === "student") {
            navigate("/TutorRequest"); // Ensure route names are correct
          } else if (result.role === "tutor") {
            navigate("/Profile");
          }
        } else {
          setError({ ...error, general: result.message || "Login failed. Try again." });
        }
      } catch (err) {
        setError({ ...error, general: "Server error. Please try again later." });
      }
    }
  };

  return (
    <>
      <div className='container-fluid d-flex align-items-center justify-content-center ' style={{ height: "671px" }}>
        <div className='row w-100'>
          <div className='col-lg-6 col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center'>
            <img src={login1} alt='Tutoring Illustration' className='img-fluid' />
          </div>
          <div className='col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-center px-4'>
            <div className='d-flex justify-content-end flex-column align-items-end mb-1 mt-n1 '>
              <div className='d-flex flex-wrap'>
                <button
                  className='btn btn-sm mx-1 my-0'
                  onClick={() => setRole("student")}
                  style={{
                    backgroundColor: role === "student" ? "green" : "white",
                    color: role === "student" ? "white" : "rgb(40, 28, 79)",
                    border: "2px solid rgb(40, 28, 79)",
                    borderRadius: "20px",
                    padding: "5px 15px",
                  }}>
                  Guardian / Student
                </button>
                <button
                  className='btn btn-sm mx-1 my-0'
                  onClick={() => setRole("tutor")}
                  style={{
                    backgroundColor: role === "tutor" ? "green" : "white",
                    color: role === "tutor" ? "white" : "rgb(40, 28, 79)",
                    border: "2px solid rgb(40, 28, 79)",
                    borderRadius: "20px",
                    padding: "5px 15px",
                  }}>
                  Tutor
                </button>
              </div>
              {error.role && <div className='text-danger small mt-2'>Please select a role before proceeding.</div>}
            </div>
            <h2 className='text-success fw-bold'>Welcome Back</h2>
            <p>Sign in to Continue your Journey.</p>
            <form onSubmit={handleSubmit}>
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
                    onClick={() => setShowPassword(!showPassword)}>
                    <i
                      className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                      style={{ fontSize: "1.2rem", color: "#B8860B" }}></i>
                  </button>
                </div>
                {error.password && <div className='text-danger small mt-1'>This field is required.</div>}
              </div>
              {error.general && <div className='text-danger small mt-2'>{error.general}</div>}
              <div className='text-end'>
                <a href='#' className='text-decoration-none'>
                  Forgot Password?
                </a>
              </div>
              <button
                type='submit'
                className='btn w-100 mt-3'
                style={{ backgroundColor: "rgb(40, 28, 79)", border: "none", color: "white" }}>
                Sign In
              </button>
            </form>
            <div className='text-center mt-3 d-flex align-items-center justify-content-center'>
              <span className='flex-grow-1 border-bottom'></span>
              <span className='mx-2'>Or</span>
              <span className='flex-grow-1 border-bottom'></span>
            </div>
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
