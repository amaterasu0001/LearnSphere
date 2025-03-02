import { useState } from "react";
import { signup } from "../Api/signup"; // Import API function
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Role selection state
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    role: false,
  });
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Selected Role Before Submission:", formData.role);
  //   setError({
  //     name: formData.name.trim() === "",
  //     email: formData.email.trim() === "",
  //     password: formData.password.trim() === "",
  //     confirmPassword: formData.confirmPassword.trim() === "",
  //     role: formData.role === "",
  //   });

  //   if (formData.password !== formData.confirmPassword) {
  //     setError((prev) => ({ ...prev, confirmPassword: true }));
  //     return;
  //   }

  //   if (!formData.role) {
  //     console.log("No role selected!");
  //     return;
  //   }

  //   const result = await signup(formData);
  //   console.log("API Response:", result);

  //   if (result.success) {
  //     setSuccess("Account created successfully! Please log in.");
  //     setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "" });
  //   } else {
  //     setError((prev) => ({ ...prev, general: result.message || "Signup failed. Try again." }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Selected Role Before Submission:", formData.role); // Debug log

    setError({
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
      confirmPassword: formData.confirmPassword.trim() === "",
      role: formData.role === "",
    });

    // ✅ Check if the email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation pattern
    if (!emailPattern.test(formData.email)) {
      setError((prev) => ({ ...prev, email: true }));
      return;
    }

    // ✅ Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    if (!formData.role) {
      console.log("No role selected!");
      return;
    }

    const result = await signup(formData);
    console.log("API Response:", result); // Debug API response

    if (result.success) {
      setSuccess("Account created successfully! Please log in.");
      setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "" });
    } else {
      setError((prev) => ({ ...prev, general: result.message || "Signup failed. Try again." }));
    }
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center vh-100'
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/?library,studyroom')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className='p-4 rounded' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", width: "400px" }}>
        <h2 className='text-white text-center mb-4'>Sign Up</h2>
        {error.general && <p className='alert alert-danger'>{error.general}</p>}
        {success && <p className='alert alert-success'>{success}</p>}

        {/* Role Selection */}
        <div className='d-flex justify-content-center mb-3'>
          <button
            className='btn btn-sm mx-1'
            onClick={() => setFormData({ ...formData, role: "student" })}
            style={{
              backgroundColor: formData.role === "student" ? "green" : "white",
              color: formData.role === "student" ? "white" : "rgb(40, 28, 79)",
              border: "2px solid rgb(40, 28, 79)",
              borderRadius: "20px",
              padding: "5px 15px",
            }}>
            Guardian / Student
          </button>
          <button
            className='btn btn-sm mx-1'
            onClick={() => setFormData({ ...formData, role: "tutor" })}
            style={{
              backgroundColor: formData.role === "tutor" ? "green" : "white",
              color: formData.role === "tutor" ? "white" : "rgb(40, 28, 79)",
              border: "2px solid rgb(40, 28, 79)",
              borderRadius: "20px",
              padding: "5px 15px",
            }}>
            Tutor
          </button>
        </div>
        {error.role && <div className='text-danger small mb-2'>Please select a role before proceeding.</div>}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label text-white'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter Username'
              className={`form-control ${error.name ? "border-danger" : ""}`}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label text-white'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter Email'
              className={`form-control ${error.email ? "border-danger" : ""}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3 position-relative'>
            <label className='form-label text-white'>Password</label>
            <div className='input-group'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Enter Password'
                className={`form-control ${error.password ? "border-danger" : ""}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type='button'
                className='btn'
                style={{ backgroundColor: "#FFF" }}
                onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`} style={{ color: "#FFA500" }}></i>
              </button>
            </div>
          </div>
          <div className='mb-3 position-relative'>
            <label className='form-label text-white'>Confirm Password</label>
            <div className='input-group'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                placeholder='Enter Confirm Password'
                className={`form-control ${error.confirmPassword ? "border-danger" : ""}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type='button'
                className='btn'
                style={{ backgroundColor: "#FFF" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <i className={`bi ${showConfirmPassword ? "bi-eye" : "bi-eye-slash"}`} style={{ color: "#FFA500" }}></i>
              </button>
            </div>
          </div>
          <button type='submit' className='btn btn-warning w-100'>
            Sign Up
          </button>
        </form>
        <p className='text-center text-white mt-3'>
          Already have an account?{" "}
          <Link to='/login' className='text-warning'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
