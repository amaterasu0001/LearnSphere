import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // Import Love Icon

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // ✅ Handle Dark Mode Instantly (No Button Required)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }

    // ✅ Listen for System or Global Toggle Changes
    const handleThemeChange = (e) => {
      if (e.matches) {
        setIsDarkMode(true);
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        setIsDarkMode(false);
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    };

    // ✅ Manually Watch for LocalStorage Changes (Fix for Same Page)
    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "dark") {
        if (!isDarkMode) {
          setIsDarkMode(true);
          document.body.classList.add("dark-mode");
        }
      } else {
        if (isDarkMode) {
          setIsDarkMode(false);
          document.body.classList.remove("dark-mode");
        }
      }
    }, 100); // ✅ Poll every 100ms for immediate effect

    // ✅ Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
      clearInterval(interval);
    };
  }, [isDarkMode]); // ✅ Fix dependency issue

  useEffect(() => {
    const fetchFavourites = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/favourite/get/${userId}`
        );
        const data = await response.json();

        if (data.success) {
          setFavourites(data.favourites);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="container mt-4">
      {/* ✅ Title and Love Icon */}
      <div
        className="d-flex align-items-center mb-4"
        style={{
          color: isDarkMode ? "#ffffff" : "#000000", // ✅ Dynamic text color
        }}
      >
        {/* ✅ Left aligned heart icon */}
        <FaHeart
          size={24}
          color="#ff4d4d"
          style={{ marginRight: "8px", cursor: "pointer" }}
        />
        <h2 className="mb-0">Favourite Tuition Jobs</h2>
      </div>

      {favourites.length === 0 ? (
        <p style={{ color: isDarkMode ? "#bbbbbb" : "#333333" }}>
          No favourite jobs found
        </p>
      ) : (
        favourites.map((favourite) => {
          const job = favourite.studentId;

          return (
            <div
              key={job._id}
              className="card shadow-sm p-3 mb-4"
              style={{
                backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
                color: isDarkMode ? "#f0f0f0" : "#000000",
                borderColor: isDarkMode ? "#333" : "#ccc",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              <div className="card-body">
                {/* ✅ Job Title */}
                <h5 className="card-title text-primary">
                  {job.studentName} needs a tutor
                </h5>

                {/* ✅ Job Details */}
                <p>
                  <strong>Job ID:</strong> {job._id} |<strong> Posted:</strong>{" "}
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Tuition Type:</strong> {job.preferredstyles}
                </p>
                <p>
                  <strong>Salary:</strong> {job.salaryRange} BDT
                </p>
                <p>
                  <strong>Subjects:</strong> {job.subjects.join(", ")}
                </p>
                <p>
                  <strong>Location:</strong> {job.area}, {job.district}
                </p>
                <p>
                  <strong>Preference:</strong>{" "}
                  <span
                    className={
                      job.tutorGender === "Female"
                        ? "text-danger"
                        : "text-secondary"
                    }
                  >
                    {job.tutorGender} tutor preferred
                  </span>
                </p>

                {/* ✅ Additional Student Details */}
                <p>
                  <strong>Student Class:</strong> {job.studentClass}
                </p>
                <p>
                  <strong>Institute:</strong> {job.instituteName}
                </p>
                <p>
                  <strong>Days Per Week:</strong> {job.daysPerWeek}
                </p>
                <p>
                  <strong>Student Gender:</strong> {job.studentGender}
                </p>
                <p>
                  <strong>Contact (Father):</strong> {job.fathersNumber}
                </p>
                <p>
                  <strong>Address:</strong> {job.address}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Favourites;
