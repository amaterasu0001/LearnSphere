import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const TuitionJobs = () => {
  const [tutorJobs, setTutorJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    console.log("Fetching tutor requests...");
    fetch("http://localhost:5000/api/auth/tutor-requests")
      .then((res) => {
        console.log("Response received:", res);
        return res.json();
      })
      .then((data) => {
        console.log("API Response Data:", data); // Debugging log
        if (data.success && data.tutorRequests.length > 0) {
          setTutorJobs(data.tutorRequests);
        } else {
          console.warn("⚠️ No tutor requests found.");
        }
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
      });
  }, []);

  const handleDetailsClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className={`container mt-4 ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h2>📚 Available Tuition Jobs</h2>
      {tutorJobs.length === 0 ? (
        <p>⚠️ No tuition jobs available</p>
      ) : (
        tutorJobs.map((job, index) => (
          <div key={index} className={`card shadow-sm p-3 mb-4 ${isDarkMode ? "dark-mode-card" : "light-mode-card"}`}>
            <div className='card-body'>
              <h5 className='card-title text-primary'>{job.studentName} needs a tutor</h5>
              <p className='card-text'>
                <strong>Job ID:</strong> {job._id} | <strong>Posted:</strong>{" "}
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
                <span className={job.tutorGender === "Female" ? "text-danger" : "text-secondary"}>
                  {job.tutorGender} tutor preferred
                </span>
              </p>
              <div className='d-flex justify-content-between'>
                <button className='btn btn-primary' onClick={() => handleDetailsClick(job)}>
                  Details
                </button>
                <button className='btn btn-outline-secondary'>Share</button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal for displaying full details */}
      <Modal show={showModal} onHide={handleCloseModal} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <p>
                <strong>Student Name:</strong> {selectedJob.studentName}
              </p>
              <p>
                <strong>Email:</strong> {selectedJob.studentEmail}
              </p>
              <p>
                <strong>Class:</strong> {selectedJob.studentClass}
              </p>
              <p>
                <strong>Institute Name:</strong> {selectedJob.instituteName}
              </p>
              <p>
                <strong>Father&apos;s Number:</strong> {selectedJob.fathersNumber}
              </p>
              <p>
                <strong>Mother&apos;s Number:</strong> {selectedJob.mothersNumber}
              </p>
              <p>
                <strong>Days Per Week:</strong> {selectedJob.daysPerWeek}
              </p>
              <p>
                <strong>Student Gender:</strong> {selectedJob.studentGender}
              </p>
              <p>
                <strong>Address:</strong> {selectedJob.address}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedJob.mobile}
              </p>
              <p>
                <strong>Details:</strong> {selectedJob.studentDetails}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TuitionJobs;
