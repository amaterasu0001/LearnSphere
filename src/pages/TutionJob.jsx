/* eslint-disable no-unused-vars */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

const TutorJobCard = ({ id, title, date, type, salary, subjects, location, preference }) => {
  return (
    <div className='card shadow-sm p-3 mb-4'>
      <div className='card-body'>
        <h5 className='card-title text-primary'>{title}</h5>
        <p className='card-text'>
          <strong>Job ID:</strong> {id} | <strong>Posted:</strong> {date}
        </p>
        <p>
          <strong>Tuition Type:</strong> {type}
        </p>
        <p>
          <strong>Salary:</strong> {salary} BDT
        </p>
        <p>
          <strong>Subjects:</strong> {subjects.join(", ")}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Preference:</strong>{" "}
          <span className={preference === "Female" ? "text-danger" : "text-secondary"}>
            {preference} tutor preferred
          </span>
        </p>
        <div className='d-flex justify-content-between'>
          <button className='btn btn-primary'>Details</button>
          <button className='btn btn-outline-secondary'>Share</button>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
TutorJobCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string.isRequired,
  preference: PropTypes.string.isRequired,
};

const TutorJobList = () => {
  const jobs = [
    {
      id: "154153",
      title: "Need Bangla Medium Tutor For Class 7 Student-4 Days/Week",
      date: "Jan 15, 2025",
      type: "Home Tutoring",
      salary: "5000",
      subjects: ["English", "General Maths", "General Science", "ICT"],
      location: "Bashabo, Dhaka",
      preference: "Any",
    },
    {
      id: "158564",
      title: "Need English Version Tutor for Class 10 Student-3 Days/Week",
      date: "Feb 15, 2025",
      type: "Home Tutoring",
      salary: "10000",
      subjects: ["General Maths", "Physics", "Chemistry", "Biology", "Higher Maths", "Bangladesh & Global Studies"],
      location: "Mohammadpur, Dhaka",
      preference: "Any",
    },
    {
      id: "158068",
      title: "Need English Medium (Cambridge) Tutor For Standard 8 Student-4 Days/Week",
      date: "Feb 11, 2025",
      type: "Home Tutoring",
      salary: "8000",
      subjects: ["Accounting", "Business Studies", "Economics"],
      location: "Mohakhali DOHS, Dhaka",
      preference: "Female",
    },
    {
      id: "152957",
      title: "Need English Medium (Ed Excel) Tutor For Standard 3 Student-4 Days/Week",
      date: "Jan 08, 2025",
      type: "Home Tutoring",
      salary: "4000",
      subjects: ["English", "Maths"],
      location: "Central Road, Dhaka",
      preference: "Female",
    },
  ];

  return (
    <>
      <Navbar /> {/* ✅ Navbar is now only rendered once */}
      <div className='container mt-4'>
        <div className='row'>
          {jobs.map((job, index) => (
            <div key={index} className='col-md-6'>
              <TutorJobCard {...job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TutorJobList;
