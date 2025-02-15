import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <div
        className='d-flex justify-content-center align-items-center vh-100'
        style={{
          backgroundImage: "url('https://source.unsplash.com/random/?library,studyroom')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className='p-4 rounded' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", width: "400px" }}>
          <h2 className='text-white text-center mb-4'>Sign Up</h2>
          <form>
            <div className='mb-3'>
              <label className='form-label text-white'>Username</label>
              <input type='text' className='form-control' placeholder='Username' />
            </div>
            <div className='mb-3'>
              <label className='form-label text-white'>Email</label>
              <input type='email' className='form-control' placeholder='johndoe@gmail.com' />
            </div>
            <div className='mb-3'>
              <label className='form-label text-white'>Password</label>
              <input type='password' className='form-control' placeholder='Password' />
            </div>
            <div className='mb-3'>
              <label className='form-label text-white'>Confirm Password</label>
              <input type='password' className='form-control' placeholder='Confirm Password' />
            </div>
            <div className='mb-3'>
              <label className='form-label text-white'>Address</label>
              <textarea className='form-control' placeholder='Address' rows='3'></textarea>
            </div>
            <button className='btn btn-warning w-100'>Sign Up</button>
          </form>
          <p className='text-center text-white mt-3'>
            Already have an account?{" "}
            <a href='#' className='text-warning'>
              Log In
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
