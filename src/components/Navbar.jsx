import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../assets/logo.png";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ Handle initial theme based on user preferences or default light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    // ✅ Remove all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("teacherId");
    localStorage.removeItem("profile");

    // ✅ Redirect user to login page
    window.location.href = "/login";
  };

  // ✅ Handle Restricted Page Access
  const handleRestrictedNavigation = (e, route) => {
    const role = localStorage.getItem("role");

    if (!isLoggedIn) {
      e.preventDefault();
      alert("You must log in first to access this page.");
      navigate("/login");
    } else if (route === "/TutionJob" && role !== "tutor") {
      e.preventDefault();
      alert("You must be logged in as a tutor to access this section.");
    } else {
      navigate(route);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "linear-gradient(90deg, rgb(40, 28, 79), rgb(83, 78, 86))",
      }}
    >
      <div className="container-fluid">
        {/* ✅ Logo */}
        <img
          src={logo}
          alt="LearnSphere Logo"
          style={{
            height: "50px",
            marginRight: "10px",
          }}
        />
        <span
          className="navbar-brand"
          style={{ color: "white", fontWeight: "bold", fontSize: "1.7rem" }}
        >
          LearnSphere
        </span>

        {/* ✅ Responsive Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "white" }}
          ></span>
        </button>

        {/* ✅ Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link"
                to="/TutionJob"
                onClick={(e) => handleRestrictedNavigation(e, "/TutionJob")}
                style={{ color: "white" }}
              >
                Tuition Jobs
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link"
                to="/TutorRequest"
                onClick={(e) => handleRestrictedNavigation(e, "/TutorRequest")}
                style={{ color: "white" }}
              >
                Tutor Request
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link"
                to="/favourites"
                onClick={(e) => handleRestrictedNavigation(e, "/favourites")}
                style={{ color: "white" }}
              >
                Favourites
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link"
                to="/AboutUs"
                style={{ color: "white" }}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="nav-link"
                to="/Profile"
                onClick={(e) => handleRestrictedNavigation(e, "/Profile")}
                style={{ color: "white" }}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item mx-2">
              {isLoggedIn && (
                <Link
                  className="nav-link"
                  to={`/chat/${localStorage.getItem("studentId") || "general"}`} // ✅ Dynamic Handling
                  onClick={(e) =>
                    handleRestrictedNavigation(
                      e,
                      `/chat/${localStorage.getItem("studentId") || "general"}`
                    )
                  }
                  style={{ color: "white" }}
                >
                  Chat
                </Link>
              )}
            </li>

            {/* ✅ Login / Logout Buttons */}
            <div className="d-flex align-items-center ms-3">
              {isLoggedIn ? (
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light me-2">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn custom-hover btn-outline-light me-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* ✅ Night Mode Toggle Icon */}
            <div className="ms-3 d-flex align-items-center">
              <button
                className="btn"
                onClick={toggleDarkMode}
                aria-label={
                  isDarkMode ? "Enable light mode" : "Enable dark mode"
                }
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "1.5rem",
                }}
              >
                <i
                  className={isDarkMode ? "bi bi-moon-fill" : "bi bi-sun-fill"}
                  style={{
                    color: isDarkMode ? "lightblue" : "yellow",
                    textShadow: isDarkMode
                      ? "0px 0px 10px lightblue"
                      : "0px 0px 10px yellow",
                  }}
                ></i>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
