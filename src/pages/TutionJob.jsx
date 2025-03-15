import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const TuitionJobs = () => {
  const [tutorJobs, setTutorJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);

  // ✅ Handle Dark Mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // ✅ Fetch Tuition Jobs from Backend
  useEffect(() => {
    console.log("Fetching tutor requests...");
    fetch("http://localhost:5000/api/auth/tutor-requests")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tutorRequests.length > 0) {
          setTutorJobs(data.tutorRequests);
        } else {
          console.warn("⚠️ No tutor requests found.");
        }
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  // ✅ Handle Modal Open/Close
  const handleDetailsClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  // ✅ Handle Add to Favourites (Backend API)
  const handleAddToFavourites = async (jobId) => {
    const userId = localStorage.getItem("userId"); // ✅ Changed from teacherId to userId
    if (!userId) {
      alert("Please log in as a tutor to select this job.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/favourite/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, studentId: jobId }), // ✅ Send userId
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Added to Favourites");
        setSelectedJobs((prev) => [...prev, jobId]);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  // ✅ Handle Checkbox Select
  const handleCheckboxChange = async (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs((prev) => prev.filter((id) => id !== jobId));
    } else {
      await handleAddToFavourites(jobId);
    }
  };

  return (
    <div className='container mt-4'>
      <h2>📚 Available Tuition Jobs</h2>
      {tutorJobs.length === 0 ? (
        <p>⚠️ No tuition jobs available</p>
      ) : (
        tutorJobs.map((job) => (
          <div key={job._id} className='container shadow-sm p-3 mb-4'>
            <div className='card-body'>
              {/* ✅ Checkbox for selecting */}
              <input
                type='checkbox'
                checked={selectedJobs.includes(job._id)}
                onChange={() => handleCheckboxChange(job._id)}
                style={{ marginRight: "10px" }}
              />
              <h5 className='card-title text-primary'>{job.studentName} needs a tutor</h5>
              <p>
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
                {/* <button className="btn btn-outline-secondary">Share</button> */}
              </div>
            </div>
          </div>
        ))
      )}

      {/* ✅ Modal for displaying full details */}
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
                <strong>Institute:</strong> {selectedJob.instituteName}
              </p>
              <p>
                <strong>Fathers Number:</strong> {selectedJob.fathersNumber}
              </p>
              <p>
                <strong>Mothers Number:</strong> {selectedJob.mothersNumber}
              </p>
              <p>
                <strong>Days Per Week:</strong> {selectedJob.daysPerWeek}
              </p>
              <p>
                <strong>Gender:</strong> {selectedJob.studentGender}
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
