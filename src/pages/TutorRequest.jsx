import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import Footer from "../components/Footer";

const TutorRequestForm = () => {
  const [formData, setFormData] = useState({
    studentEmail: "",
    studentName: "", //
    district: "", //
    area: "", //
    studentClass: "",
    subjects: "", //
    instituteName: "",
    fathersNumber: "",
    mothersNumber: "",
    preferredstyles: "", //
    studentDetails: "",
    daysPerWeek: "",
    studentGender: "",
    salaryRange: "", //
    tutorGender: "", //
    address: "",
    mobile: "",
  });

  const email = localStorage.getItem("email") || "";
  const name = localStorage.getItem("name") || "";
  const role = localStorage.getItem("role");

  // 🔹 **Fetch Tutor Request Function (useEffect & handleSubmit er moddhe use kora jabe)**
  const fetchTutorRequest = async () => {
    if (!email) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/tutor-request/${email}`);
      const data = await response.json();

      if (data.success && data.tutorRequest) {
        setFormData((prevData) => ({
          ...prevData,
          ...data.tutorRequest,
        }));
      }
    } catch (error) {
      console.error("❌ Error fetching tutor request:", error);
    }
  };

  // 🔹 **UseEffect to Load Data Initially**
  useEffect(() => {
    if (role === "student") {
      setFormData((prevData) => ({
        ...prevData,
        studentEmail: email,
        studentName: name,
      }));

      fetchTutorRequest(); // ✅ Initial data fetch
    }
  }, [email]);

  // 🔹 **Handle Change Function**
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 🔹 **Handle Submit Function**
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
      const response = await fetch("http://localhost:5000/api/auth/tutor-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Tutor request submitted/updated successfully!");

        // ✅ **Fetch Updated Data Again After Submission**
        fetchTutorRequest(); // ✅ Updated data will reload immediately
      } else {
        alert("❌ Failed to submit/update request: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting tutor request:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <>
      <div
        id='form-container'
        className='p-4 rounded light-theme d-flex flex-column'
        style={{ maxWidth: "900px", margin: "0 auto", minHeight: "80vh" }}>
        <div className='d-flex justify-content-center align-items-center mb-4'>
          <h2 className='text-center'>Tutor Request Form</h2>
        </div>

        <Form onSubmit={handleSubmit} className='flex-grow-1'>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Full Name <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Name'
                  type='text'
                  name='studentName'
                  value={formData.studentName}
                  onChange={handleChange}
                  disabled
                  className='custom-disabled'
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Email <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Email'
                  type='email'
                  name='studentEmail'
                  value={formData.studentEmail}
                  onChange={handleChange}
                  disabled
                  className='custom-disabled'
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Institute Name <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Institute Name'
                  type='text'
                  name='instituteName'
                  value={formData.instituteName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  District <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='district' value={formData.district} onChange={handleChange}>
                  <option value=''>Select District</option>
                  <option value='Dhaka'>Dhaka</option>
                  <option value='Chattogram'>Chattogram</option>
                  <option value='Sylhet'>Sylhet</option>
                  <option value='Khulna'>Khulna</option>
                  <option value='Barishal'>Barishal</option>
                  <option value='Mymensingh'>Mymensingh</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Area<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select type='text' name='area' value={formData.area || ""} onChange={handleChange} required>
                  <option value=''>Select location</option>
                  <option value='Mirpur'>Mirpur</option>
                  <option value='Khamarbari'>Khamarbari</option>
                  <option value='Gulshan'>Gulshan</option>
                  <option value='Khilkhet'>Khilkhet</option>
                  <option value='Airport'>Airport</option>
                  <option value='Agargaon'>Agargaon</option>
                  <option value='Taltola'>Taltola</option>
                  <option value='Farmgate'>Farmgate</option>
                  <option value='Kuril'>Kuril</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Subjects <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='subjects' value={formData.subjects} onChange={handleChange}>
                  <option value=''>Select Subject</option>
                  <option value='Mathematics'>Mathematics</option>
                  <option value='English'>English</option>
                  <option value='Physics'>Physics</option>
                  <option value='Chemistry'>Chemistry</option>
                  <option value='Biology'>Biology</option>
                  <option value='Accounting'>Accounting</option>
                  <option value='Business Studies'>Business Studies</option>
                  <option value='Economics'>Economics</option>
                  <option value='ICT'>ICT</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Father&apos;s Phone Number <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Father's Phone Number"
                  type='text'
                  name='fathersNumber'
                  value={formData.fathersNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Mother&apos;s Phone Number <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Mother's Phone Number"
                  type='text'
                  name='mothersNumber'
                  value={formData.mothersNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Student Gender <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='studentGender' value={formData.studentGender} onChange={handleChange}>
                  <option value=''>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Salary Range <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Select Range'
                  type='text'
                  name='salaryRange'
                  value={formData.salaryRange}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Tutor Gender Preference <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select name='tutorGender' value={formData.tutorGender} onChange={handleChange}>
                  <option value=''>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Either'>Either</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Days Per Week <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select
                  type='text'
                  name='daysPerWeek'
                  value={formData.daysPerWeek || ""}
                  onChange={handleChange}
                  required>
                  <option value=''>Select Days</option>
                  <option value='2Days'>2Days</option>
                  <option value='3Days'>3Days</option>
                  <option value='4Days'>4Days</option>
                  <option value='5Days'>5Days</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Student Class <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select type='text' name='studentClass' value={formData.studentClass} onChange={handleChange}>
                  <option>Select Class</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  <option>Class 3</option>
                  <option>Class 4</option>
                  <option>Class 5</option>
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                  <option>HSC 1st Year</option>
                  <option>HSC 2nd Year</option>
                  <option>O Level</option>
                  <option>A Level</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* <Form.Group>
                <Form.Label>
                  School Name <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control type='text' name='schoolName' value={formData.schoolName} onChange={handleChange} />
              </Form.Group> */}

              <Form.Group>
                <Form.Label>
                  Preferred Styles<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select
                  type='text'
                  name='preferredstyles'
                  value={formData.preferredstyles}
                  onChange={handleChange}
                  required>
                  <option value=''>Select Method</option>
                  <option value='At Home'>At Home</option>
                  <option value='At Tutors Home'>At Tutor&apos;s Home</option>
                  <option value='Coaching'>Coaching</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Address <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Address'
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Mobile <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Mobile Number'
                  type='text'
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Details (Write your needs here)</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  name='studentDetails'
                  value={formData.studentDetails}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type='submit' className='w-100 mt-3' style={{ backgroundColor: "rgb(40, 28, 79)" }}>
            Submit Request
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default TutorRequestForm;
