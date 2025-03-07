import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import Footer from "../components/Footer";

const TutorRequestForm = () => {
  const [formData, setFormData] = useState({
    studentEmail: "",
    studentName: "",
    district: "",
    area: "",
    medium: "English",
    studentClass: "Class 10",
    subjects: "",
    instituteName: "",
    fathersNumber: "",
    mothersNumber: "",
    studentDetails: "",
    schoolName: "",
    daysPerWeek: "3 days/week",
    studentGender: "Any Gender",
    salaryRange: "Negotiable",
    tutorGender: "Any Gender",
    address: "",
    mobile: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    const name = localStorage.getItem("name") || "";
    const role = localStorage.getItem("role");

    if (role === "student") {
      setFormData((prevData) => ({
        ...prevData,
        studentEmail: email,
        studentName: name,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let cleanedData = { ...formData };
    Object.keys(cleanedData).forEach((key) => {
      if (typeof cleanedData[key] === "string") {
        cleanedData[key] = cleanedData[key].trim();
      }
    });

    console.log("📤 Sending Tutor Request Data:", cleanedData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/tutor-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanedData),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("✅ Tutor request submitted successfully!");
        setFormData({
          studentEmail:
            localStorage.getItem("role") === "student"
              ? localStorage.getItem("email")
              : "",
          studentName:
            localStorage.getItem("role") === "student"
              ? localStorage.getItem("name")
              : "",
          district: "",
          area: "",
          medium: "English",
          studentClass: "Class 10",
          subjects: "",
          instituteName: "",
          fathersNumber: "",
          mothersNumber: "",
          studentDetails: "",
          schoolName: "",
          daysPerWeek: "3 days/week",
          studentGender: "Any Gender",
          salaryRange: "Negotiable",
          tutorGender: "Any Gender",
          address: "",
          mobile: "",
        });
      } else {
        alert("❌ Failed to submit request: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting tutor request:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <>
      <div
        id="form-container"
        className="p-4 rounded light-theme d-flex flex-column"
        style={{ maxWidth: "900px", margin: "0 auto", minHeight: "80vh" }}
      >
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h2 className="text-center">Tutor Request Form</h2>
        </div>

        <Form onSubmit={handleSubmit} className="flex-grow-1">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>District</Form.Label>
                <Form.Select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="">Select District</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Subjects</Form.Label>
                <Form.Select
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Economics">Economics</option>
                  <option value="ICT">ICT</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Father's Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="fathersNumber"
                  value={formData.fathersNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Mother's Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mothersNumber"
                  value={formData.mothersNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Details (Write your needs here)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="studentDetails"
                  value={formData.studentDetails}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            className="w-100 mt-3"
            style={{ backgroundColor: "rgb(40, 28, 79)" }}
          >
            Submit Request
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default TutorRequestForm;
