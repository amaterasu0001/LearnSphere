import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import signupImage from "../assets/signup.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { signup } from "../Api/signup"; // Importing API function

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    role: false,
  });
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Setting errors for empty fields
    setError({
      name: name.trim() === "",
      email: email.trim() === "",
      password: password.trim() === "",
      role: role === "",
    });

    // Check if all fields are filled out correctly
    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "" && role !== "") {
      try {
        // Calling the signup API with the role selected at submission time
        const result = await signup({ name, email, password, role });

        if (result.success) {
          // Show success message
          setSuccessMessage("Account created successfully! You will be redirected to login.");
          setError({ name: false, email: false, password: false, role: false }); // Clear any previous errors
        } else {
          // If the signup fails, show the error message
          setError({
            ...error,
            general: result.message || "Signup failed. Try again.",
          });
          setSuccessMessage(""); // Clear success message if there is an error
        }
      } catch (err) {
        // Show server error if API call fails
        setError({
          ...error,
          general: "Server error. Please try again later.",
        });
        setSuccessMessage(""); // Clear success message if there is a server error
      }
    }
  };

  return (
    <>
      <div className='container-fluid d-flex align-items-center justify-content-center ' style={{ height: "671px" }}>
        <div className='row w-100'>
          <div className='col-lg-6 col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center'>
            <img src={signupImage} alt='Signup Illustration' className='img-fluid' />
          </div>
          <div className='col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-center px-4'>
            <h2 className='text-success fw-bold'>Create an Account</h2>
            <p>Sign up to get started.</p>

            <div className='mb-3 d-flex justify-content-center'>
              <button
                className='btn mx-1'
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
                className='btn mx-1'
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
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label fw-bold'>
                  Full Name<span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  id='name'
                  className={`form-control ${error.name ? "border-danger" : ""}`}
                  placeholder='Enter your full name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {error.name && <div className='text-danger small mt-1'>This field is required.</div>}
              </div>

              <div className='mb-3'>
                <label htmlFor='email' className='form-label fw-bold'>
                  Email<span className='text-danger'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  className={`form-control ${error.email ? "border-danger" : ""}`}
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error.email && <div className='text-danger small mt-1'>This field is required.</div>}
              </div>

              <div className='mb-3'>
                <label htmlFor='password' className='form-label fw-bold'>
                  Password<span className='text-danger'>*</span>
                </label>
                <input
                  type='password'
                  id='password'
                  className={`form-control ${error.password ? "border-danger" : ""}`}
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error.password && <div className='text-danger small mt-1'>This field is required.</div>}
              </div>

              {/* Success message */}
              {successMessage && (
                <div className='alert alert-success mt-2' role='alert'>
                  {successMessage}
                </div>
              )}

              {/* Error message */}
              {error.general && (
                <div className='alert alert-danger mt-2' role='alert'>
                  {error.general}
                </div>
              )}

              {error.role && (
                <div className='text-danger small text-center'>Please select a role before proceeding.</div>
              )}

              <button
                type='submit'
                className='btn w-100 mt-3'
                style={{
                  backgroundColor: "rgb(40, 28, 79)",
                  border: "none",
                  color: "white",
                }}>
                Sign Up
              </button>
            </form>
            <div className='text-center mt-3 d-flex align-items-center justify-content-center'>
              <span className='flex-grow-1 border-bottom'></span>
              <span className='mx-2'>Or</span>
              <span className='flex-grow-1 border-bottom'></span>
            </div>
            <button className='btn btn-dark w-100 mt-3' onClick={() => navigate("/login")}>
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
