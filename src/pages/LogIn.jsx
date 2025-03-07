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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError({ email: email.trim() === "", password: password.trim() === "", role: role === "" });

  //   if (email.trim() !== "" && password.trim() !== "" && role !== "") {
  //     try {
  //       const result = await login({ email, password, role }); // Call API

  //       if (result.success) {
  //         localStorage.setItem("token", result.token);
  //         localStorage.setItem("email", email);
  //         localStorage.setItem("name", result.name); // ✅ Store name
  //         localStorage.setItem("role", result.role);

  //         // ✅ Automatically redirect the user based on role
  //         if (result.role === "student") {
  //           navigate("/TutorRequest");
  //         } else if (result.role === "tutor") {
  //           navigate("/Profile");
  //         }
  //       } else {
  //         setError({ ...error, general: result.message || "Login failed. Try again." });
  //       }
  //     } catch (err) {
  //       setError({ ...error, general: "Server error. Please try again later." });
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: email.trim() === "", password: password.trim() === "", role: role === "" });

    if (email.trim() !== "" && password.trim() !== "" && role !== "") {
      try {
        const result = await login({ email, password, role });

        if (result.success) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("email", email);
          localStorage.setItem("name", result.name);
          localStorage.setItem("role", result.role);

          // ✅ Fetch profile data after login
          const profileResponse = await fetch(`http://localhost:5000/api/auth/profile/get?email=${email}`);
          const profileData = await profileResponse.json();

          if (profileData.success) {
            localStorage.setItem("profile", JSON.stringify(profileData.profile)); // ✅ Store profile in localStorage
          }

          // ✅ Redirect user based on role
          if (result.role === "tutor") {
            navigate("/Profile"); // Redirect tutors to the Profile page
          } else if (result.role === "student") {
            navigate("/TutorRequest"); // Redirect students to the TutorRequest page
          }
        } else {
          setError({ ...error, general: result.message || "Login failed. Try again." });
        }
      } catch (err) {
        setError({ ...error, general: "Server error. Please try again later." });
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      setResetMessage("Please enter your registered email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();
      if (data.success) {
        setResetMessage("Recovery code sent! Check your email.");
      } else {
        setResetMessage(data.message);
      }
    } catch (error) {
      setResetMessage("Server error, please try again later.");
    }
  };

  {
    showForgotPassword && (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <h4>Forgot Password</h4>
          <input
            type='email'
            placeholder='Enter your registered email'
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className='form-control'
          />
          <button className='btn btn-primary mt-2' onClick={handleForgotPassword}>
            Send Recovery Code
          </button>
          {resetMessage && <p className='text-danger'>{resetMessage}</p>}
          <button className='btn btn-secondary mt-2' onClick={() => setShowForgotPassword(false)}>
            Close
          </button>
        </div>
      </div>
    );
  }

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
                <a href='#' className='text-decoration-none' onClick={() => setShowForgotPassword(true)}>
                  Forgot Password?
                </a>
                {/* <button className='btn btn-primary mt-2' onClick={() => navigate("/reset-password")}>
                  Enter Recovery Code
                </button> */}
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
