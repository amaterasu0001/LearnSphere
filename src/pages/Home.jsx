import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import homeImage from "../assets/home1.png";

const Home = () => {
  return (
    <div className='container-fluid bg-white py-5'>
      <div className='row align-items-center'>
        {/* Left Content */}
        <div className='col-lg-6 text-center text-lg-start '>
          <h1 className='display-4 fw-bold text-primary ms-lg-5'>
            Best <span className='text-success'>Tutoring Platform</span>
          </h1>
          <h2 className='text-secondary fw-semibold ms-lg-5'>for Home & Online Tuitions</h2>
          <p className='text-muted mt-3'>
            <i className='bi bi-geo-alt-fill text-primary ms-lg-5'></i> Find the Right Tutor in Your Area
          </p>
          {/* Button with Gradient */}
          <button
            className='btn btn-lg mt-4 px-4 text-light fw-bold ms-lg-5'
            style={{
              backgroundColor: "#6a1b9a",
              border: "none",
            }}>
            <i className='bi bi-search me-2'></i> Find a Tutor
          </button>
        </div>

        {/* Right Illustration */}
        <div className='col-lg-6 text-center mt-5 mt-lg-0'>
          <img
            src={homeImage} // Replace this URL with the actual image path
            alt='Tutor Illustration'
            className='img-fluid'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
