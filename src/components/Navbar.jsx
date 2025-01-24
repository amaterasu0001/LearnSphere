import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  return (
    <nav
      className='navbar navbar-expand-lg sticky-top'
      style={{ background: "linear-gradient(90deg,rgb(40, 28, 79),rgb(83, 78, 86))" }}>
      <div className='container-fluid'>
        {/* Logo */}
        <Link className='navbar-brand' to='/' style={{ color: "white", fontWeight: "bold", fontSize: "1.7rem" }}>
          LearnSphere
        </Link>

        {/* Responsive Toggler */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' style={{ color: "white" }}></span>
        </button>

        {/* Navbar Links */}
        <div className='collapse navbar-collapse' id='navbarNav'>
          {/* Right-Aligned Links and Buttons */}
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item mx-2'>
              <Link className='nav-link' to='/tuition-jobs' style={{ color: "white", fontSize: "1rem" }}>
                Tuition Jobs
              </Link>
            </li>
            <li className='nav-item mx-2'>
              <Link className='nav-link' to='/premium-tutors' style={{ color: "white", fontSize: "1rem" }}>
                Premium Tutors
              </Link>
            </li>
            <li className='nav-item mx-2'>
              <Link className='nav-link' to='/tutor-request' style={{ color: "white", fontSize: "1rem" }}>
                Tutor Request
              </Link>
            </li>
            <li className='nav-item mx-2'>
              <Link className='nav-link' to='/AboutUs' style={{ color: "white", fontSize: "1rem" }}>
                About Us
              </Link>
            </li>
            <li className='nav-item mx-2'>
              <Link className='nav-link' to='/Profile' style={{ color: "white", fontSize: "1rem" }}>
                Profile
              </Link>
            </li>
            {/* Login and Sign Up Buttons */}
            <div className='d-flex align-items-center ms-3'>
              <Link to='/login' className='btn btn-outline-light me-2'>
                Login
              </Link>
              <Link to='/signup' className='btn btn-light'>
                Sign Up
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
