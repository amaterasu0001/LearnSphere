import React, { useState } from "react";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    // Bachelor
    bachelorInstitute: "",
    bachelorDegree: "",
    bachelorMajor: "",
    bachelorIdCard: "",
    bachelorResult: "",
    bachelorCurriculum: "",
    bachelorFromDate: "",
    bachelorToDate: "",
    bachelorYearOfPassing: "",
    bachelorCurrentInstitute: "",

    // HSC
    hscInstitute: "",
    hscDegree: "",
    hscMajor: "",
    hscIdCard: "",
    hscResult: "",
    hscCurriculum: "",
    hscFromDate: "",
    hscToDate: "",
    hscYearOfPassing: "",
    hscCurrentInstitute: "",

    // SSC
    sscInstitute: "",
    sscDegree: "",
    sscMajor: "",
    sscIdCard: "",
    sscResult: "",
    sscCurriculum: "",
    sscFromDate: "",
    sscToDate: "",
    sscYearOfPassing: "",
    sscCurrentInstitute: "",

    // Personal Information
    email: "",
    additionalNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    birthCertificateNo: "",
    nationality: "",
    facebookProfileLink: "",
    linkedInProfileLink: "",
    fathersName: "",
    fathersNumber: "",
    mothersName: "",
    mothersNumber: "",

    // Emergency Information
    emergencyName: "",
    emergencyRelation: "",
    emergencyNumber: "",
    emergencyAddress: "",
  });

  // useEffect(() => {
  //   const rootElement = document.documentElement;
  //   const formContainer = document.getElementById("form-container");

  //   const applyTheme = () => {
  //     const darkMode = rootElement.classList.contains("dark-mode");
  //     if (darkMode) {
  //       formContainer?.classList.add("dark-theme");
  //     } else {
  //       formContainer?.classList.remove("dark-theme");
  //     }
  //   };

  //   applyTheme();

  //   const observer = new MutationObserver(applyTheme);
  //   observer.observe(rootElement, {
  //     attributes: true,
  //     attributeFilter: ["class"],
  //   });

  //   return () => observer.disconnect();
  // }, []);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to save your profile.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        setError(data.message || "Profile update failed.");
      }
    } catch (error) {
      console.error("Profile Save Error:", error);
      setError("Server error. Try again later.");
    }
  };
  

  return (
    <>
      <Container className='mt-4'>
        <Card className='p-4 rounded' style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
          <h3 className='text-white text-center mb-4'>Educational Information</h3>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form className='text-white' onSubmit={handleSave} noValidate>
            {["bachelor", "hsc", "ssc"].map((level) => (
              <div key={level} className='mb-4'>
                <h4>{level.toUpperCase()}</h4>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Institute<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Institute'
                        type='text'
                        name={`${level}Institute`}
                        value={formData[`${level}Institute`] || ""} // Ensuring default empty string
                        onChange={handleChange}
                        required
                        style={{ color: "white" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Exam / Degree Title<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level}Degree`}
                        value={formData[`${level}Degree`] || ""}
                        onChange={(e) => setFormData({ ...formData, [`${level}Degree`]: e.target.value })}
                        required>
                        <option value=''>Select Degree</option>
                        <option value='Secondary'>Secondary</option>
                        <option value='Higher Secondary'>Higher Secondary</option>
                        <option value='Diploma'>Diploma</option>
                        <option value='Bachelor/Honors'>Bachelor/Honors</option>
                        <option value='Masters'>Masters</option>
                        <option value='Doctoral'>Doctoral</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Major<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level}Major`}
                        value={formData[`${level}Major`] || ""}
                        onChange={(e) => setFormData({ ...formData, [`${level}Major`]: e.target.value })}
                        required>
                        <option value=''>Select Major</option>
                        <option value='Computer Science and Engineering'>Computer Science and Engineering(CSE)</option>
                        <option value='Supply Chain Management'>Supply Chain Management</option>
                        <option value='Biomedical Engineering'>Biomedical Engineering</option>
                        <option value='Electrical Engineering'>Electrical Engineering</option>
                        <option value='Robotics & Automation'>Robotics & Automation</option>
                        <option value='Nutrition & Dietetics'>Nutrition & Dietetics</option>
                        <option value='Mass Communication'>Mass Communication</option>
                        <option value='Game Development'>Game Development</option>
                        <option value='Science'>Science</option>
                        <option value='Arts'>Arts</option>
                        <option value='Commerce'>Commerce</option>
                        <option value='Moallim'>Moallim</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        ID Card No<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter ID'
                        type='text'
                        name={`${level}IdCard`}
                        value={formData[`${level}IdCard`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Result<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Result'
                        type='text'
                        name={`${level}Result`}
                        value={formData[`${level}Result`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Curriculum<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level}Curriculum`}
                        value={formData[`${level}Curriculum`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level}Curriculum`]: e.target.value })} // Fix the key here
                        required>
                        <option value=''>Select Curriculum</option>
                        <option value='Bangla Version'>Bangla Version</option>
                        <option value='English Version'>English Version</option>
                        <option value='Cambridge'>Cambridge</option>
                        <option value='IB'>IB</option>
                        <option value='Ed-Excel'>Ed-Excel</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Year of Passing</Form.Label>
                      <Form.Control
                        placeholder='Enter Year'
                        type='text'
                        name={`${level}YearOfPassing`}
                        value={formData[`${level}YearOfPassing`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Current Institute<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='YES/NO'
                        type='text'
                        name={`${level}CurrentInstitute`}
                        value={formData[`${level}CurrentInstitute`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}
            <br />
            {["Tuition Related Information"].map((level1) => (
              <div key={level1} className='mb-4'>
                <h4>{level1.toUpperCase()}</h4>
                {/* <h3 className='mb-4'>Tuition Related Information</h3> */}

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Tutoring Method<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level1}tutoringMethod`}
                        value={formData[`${level1}tutoringMethod`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level1}tutoringMethod`]: e.target.value })} // Fix the key here
                        required>
                        <option value=''>Select Method</option>
                        <option value='Student Home'>Student Home</option>
                        <option value='Home'>Home</option>
                        <option value='Coaching'>Coaching</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Available Days<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level1}availableDays`}
                        value={formData[`${level1}availableDays`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level1}availableDays`]: e.target.value })} // Fix the key here
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
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Time<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Time'
                        type='text'
                        name={`${level1}time`}
                        value={formData[`${level1}time`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        City<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level1}city`}
                        value={formData[`${level1}city`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level1}city`]: e.target.value })} // Fix the key here
                        required>
                        <option value=''>Select City</option>
                        <option value='Dhaka'>Dhaka</option>
                        <option value='Barishal'>Barishal</option>
                        <option value='Khulna'>Khulna</option>
                        <option value='Sylhet'>Sylhet</option>
                        <option value='Chattogram'>Chattogram</option>
                        <option value='Mymensing'>Mymensing</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Location<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level1}location`}
                        value={formData[`${level1}location`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level1}location`]: e.target.value })} // Fix the key here
                        required>
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
                      <Form.Label className='text-white'>
                        Preferred Locations<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter preferred location'
                        type='text'
                        name={`${level1}preferredlocation`}
                        value={formData[`${level1}preferredlocation`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Expected Salary<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Salary'
                        type='text'
                        name={`${level1}expectedSalary`}
                        value={formData[`${level1}expectedSalary`]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Preferred Categories<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Catagories'
                        type='text'
                        name={`${level1}preferredCategories`}
                        value={formData.preferredCategories}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Preferred Classes<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Classes'
                        type='text'
                        name={`${level1}preferredClasses`}
                        value={formData.preferredClasses}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Preferred Subjects<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Subjects'
                        type='text'
                        name={`${level1}preferredSubjects`}
                        value={formData.preferredSubjects}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Place of Tutoring<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Tutoring'
                        type='text'
                        name={`${level1}placeOfTutoring`}
                        value={formData.placeOfTutoring}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Tutoring Styles<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Style'
                        type='text'
                        name={`${level1}tutoringStyles`}
                        value={formData.tutoringStyles}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Total Experience<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Experience'
                        type='text'
                        name={`${level1}totalExperience`}
                        value={formData.totalExperience}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Experience Details</Form.Label>

                      <Form.Control
                        as='textarea' // Allows multi-line paragraph input
                        placeholder='Enter Details'
                        name={`${level1}experienceDetails`}
                        value={formData.experienceDetails}
                        onChange={handleChange}
                        required
                        // Adjust the number of visible rows
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}

            {["Personal Information"].map((level2) => (
              <div key={level2} className='mb-4'>
                <h4>{level2.toUpperCase()}</h4>

                {/* <h3 className='mb-4'>Personal Information</h3> */}

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Email<span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder='Enter Email'
                        type='email'
                        name={`${level2}email`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Additional Number<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Number'
                        type='text'
                        name={`${level2}additionalNumber`}
                        value={formData.additionalNumber}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Address<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Address'
                        type='text'
                        name={`${level2}address`}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Gender<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Select
                        name={`${level2}gender`}
                        value={formData[`${level2}gender`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level2}gender`]: e.target.value })} // Fix the key here
                        required>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Trans'>Trans</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Date of Birth</Form.Label>

                      <Form.Control
                        placeholder='Enter Date of Birth'
                        type='date'
                        name={`${level2}dateOfBirth`}
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Religion</Form.Label>

                      <Form.Select
                        name={`${level2}religion`}
                        value={formData[`${level2}religion`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level2}religion`]: e.target.value })} // Fix the key here
                        required>
                        <option value=''>Select religion</option>
                        <option value='Islam'>Islam</option>
                        <option value='Hinduism'>Hinduism</option>
                        <option value='Buddhism'>Buddhism</option>
                        <option value='Christianity'>Christianity</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Birth Certificate No</Form.Label>

                      <Form.Control
                        placeholder='Enter Birth Certificate No'
                        type='text'
                        name={`${level2}birthCertificateNo`}
                        value={formData.birthCertificateNo}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Nationality<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Nationality'
                        type='text'
                        name={`${level2}nationality`}
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Facebook Profile Link</Form.Label>

                      <Form.Control
                        placeholder='Enter FB Link'
                        type='text'
                        name={`${level2}facebookProfileLink`}
                        value={formData.facebookProfileLink}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>LinkedIn Profile Link</Form.Label>

                      <Form.Control
                        placeholder='Enter LinkedIn Link'
                        type='text'
                        name={`${level2}linkedInProfileLink`}
                        value={formData.linkedInProfileLink}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Father&apos;s Name<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Father Name'
                        type='text'
                        name={`${level2}fathersName`}
                        value={formData.fathersName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Father&apos;s Number<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Father Number'
                        type='text'
                        name={`${level2}fathersNumber`}
                        value={formData.fathersNumber}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Mother&apos;s Name<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Mother Name'
                        type='text'
                        name={`${level2}mothersName`}
                        value={formData.mothersName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Mother&apos;s Number<span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Mother Number'
                        type='text'
                        name={`${level2}mothersNumber`}
                        value={formData.mothersNumber}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}
            {["Emergency Information"].map((level3) => (
              <div key={level3} className='mb-4'>
                <h4>{level3.toUpperCase()}</h4>

                {/* <h3 className='mb-4'>Emergency Information</h3> */}
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Name</Form.Label>

                      <Form.Control
                        placeholder='Enter Name'
                        type='text'
                        name={`${level3}emergencyName`}
                        value={formData.emergencyName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Relation</Form.Label>

                      <Form.Control
                        placeholder='Enter Relation'
                        type='text'
                        name={`${level3}emergencyRelation`}
                        value={formData.emergencyRelation}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Number</Form.Label>

                      <Form.Control
                        placeholder='Enter Number'
                        type='text'
                        name={`${level3}emergencyNumber`}
                        value={formData.emergencyNumber}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Address</Form.Label>

                      <Form.Control
                        placeholder='Enter Address'
                        type='text'
                        name={`${level3}emergencyAddress`}
                        value={formData.emergencyAddress}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}
            <div className='d-flex justify-content-center mt-3'>
              <Button
                style={{ backgroundColor: "rgb(40, 28, 79)", borderColor: "rgb(40, 28, 79)" }}
                onClick={() => alert("Form Submitted Successfully")}>
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default UserProfile;
