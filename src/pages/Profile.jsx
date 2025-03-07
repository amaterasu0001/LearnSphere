import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container, Form, Button, Row, Col, Card, Alert } from "react-bootstrap";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "",
    name: localStorage.getItem("name") || "",
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
    // email: "",
    location: "",
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

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role"); // ✅ Get role

      if (!email || !role) return; // ✅ Ensure email & role exist

      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile/get?email=${email}`);
        const data = await response.json();

        if (data.success && data.profile) {
          if (role === "tutor") {
            console.log("✅ Teacher Profile Loaded:", data.profile);
            setFormData((prevData) => ({
              ...prevData,
              ...data.profile, // ✅ Fill in teacher profile from DB
            }));
          } else if (role === "student") {
            console.log("✅ Student Profile Cleared");
            setFormData({
              email: "", // ✅ Ensure blank profile for students
              name: "",
              role: "",
              sscInstitute: "",
              sscResult: "",
              sscCurriculum: "",
              hscInstitute: "",
              hscResult: "",
              hscCurriculum: "",
              bachelorInstitute: "",
              bachelorResult: "",
              bachelorCurriculum: "",
              address: "",
              mobile: "",
              nationality: "",
            });
          }
        } else {
          console.warn("⚠ No profile data found!");
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("token");
  //   const email = localStorage.getItem("email"); // ✅ Get email from localStorage
  //   const name = localStorage.getItem("name"); // ✅ Get name from localStorage

  //   if (!token || !email || !name) {
  //     alert("You must be logged in to update your profile.");
  //     return;
  //   }

  //   const profileData = {
  //     email,
  //     name, // ✅ Always send logged-in name
  //     address: formData.address,
  //     gender: formData.gender,
  //     location: formData.location,
  //     additionalNumber: formData.additionalNumber,
  //     dateOfBirth: formData.dateOfBirth,
  //     nationality: formData.nationality,
  //     fathersName: formData.fathersName,
  //     mothersName: formData.mothersName,
  //     religion: formData.religion,
  //     birthCertificateNo: formData.birthCertificateNo,
  //     facebookProfileLink: formData.facebookProfileLink,
  //     linkedInProfileLink: formData.linkedInProfileLink,
  //     fathersNumber: formData.fathersNumber,
  //     mothersNumber: formData.mothersNumber,
  //     bachelorInstitute: formData.bachelorInstitute,
  //     bachelorDegree: formData.bachelorDegree,
  //     bachelorMajor: formData.bachelorMajor,
  //     hscInstitute: formData.hscInstitute,
  //     hscDegree: formData.hscDegree,
  //     hscMajor: formData.hscMajor,
  //     sscInstitute: formData.sscInstitute,
  //     sscDegree: formData.sscDegree,
  //     sscMajor: formData.sscMajor,
  //   };

  //   console.log("📤 Sending Profile Data:", profileData);

  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/profile/update", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(profileData),
  //     });

  //     const data = await response.json();
  //     console.log("📥 Response Received:", data);

  //     if (data.success) {
  //       alert("Profile updated successfully!");
  //       console.log("✅ Updated Profile:", data.profile);
  //     } else {
  //       alert("Profile update failed: " + data.message);
  //     }
  //   } catch (error) {
  //     console.error("❌ Profile Update Error:", error);
  //     alert("Server error. Try again later.");
  //   }
  // };

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    let name = localStorage.getItem("name");
    let role = localStorage.getItem("role");

    // Check if required fields are present
    if (!token || !email || !name || !role) {
      alert("Error: Email, Name, and Role are required for profile update.");
      return;
    }

    // Ensure formData contains the required fields
    let profileData = {
      email,
      name,
      role,
      ...formData, // Merge with existing form data
    };

    // ✅ Remove empty values
    Object.keys(profileData).forEach((key) => {
      if (!profileData[key]) delete profileData[key];
    });

    console.log("📤 Sending Profile Data:", profileData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      console.log("📥 Response Received:", data);

      if (data.success) {
        alert("✅ Profile updated successfully!");
        setFormData(data.profile); // Update state with new profile data
        localStorage.setItem("profile", JSON.stringify(data.profile)); // Save updated profile
      } else {
        alert("❌ Profile update failed: " + data.message);
      }
    } catch (error) {
      console.error("❌ Profile Update Error:", error);
      alert("Server error. Try again later.");
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
                        style={{
                          color: localStorage.getItem("theme") === "dark" ? "white" : "black",
                          backgroundColor: localStorage.getItem("theme") === "dark" ? "#333" : "white",
                          borderColor: localStorage.getItem("theme") === "dark" ? "#555" : "#ccc",
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Exam / Degree Title
                        <span className='text-danger'>*</span>
                      </Form.Label>
                      <Form.Select
                        name={`${level}Degree`}
                        value={formData[`${level}Degree`] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${level}Degree`]: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${level}Major`]: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${level}Curriculum`]: e.target.value,
                          })
                        } // Fix the key here
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${level1}tutoringMethod`]: e.target.value,
                          })
                        } // Fix the key here
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${level1}availableDays`]: e.target.value,
                          })
                        } // Fix the key here
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${level1}city`]: e.target.value,
                          })
                        } // Fix the key here
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
                        type='text'
                        name='location'
                        value={formData.location || ""}
                        onChange={handleChange}
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
                        Preferred Locations
                        <span className='text-danger'>*</span>
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
                        Preferred Categories
                        <span className='text-danger'>*</span>
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
                        // type='email'
                        // name={`${level2}email`}
                        // value={formData[`${level2}email`] || ""}
                        // onChange={handleChange}
                        // required
                        type='email'
                        name='email'
                        value={formData.email || ""}
                        disabled // ✅ Prevent users from changing email
                        className='custom-disabled'
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
                        // name={`${level2}additionalNumber`}
                        // value={formData[`${level2}additionalNumber`] || ""}
                        // onChange={handleChange}
                        // required
                        name='additionalNumber'
                        value={formData.additionalNumber || ""}
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
                        // name={`${level2}address`}
                        // value={formData[`${level2}address`] || ""}
                        // onChange={handleChange}
                        // required
                        name='address'
                        value={formData.address || ""}
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

                      {/* <Form.Select
                        name={`${level2}gender`}
                        value={formData[`${level2}gender`] || ""} // Ensure a default empty value
                        onChange={(e) => setFormData({ ...formData, [`${level2}gender`]: e.target.value })} // Fix the key here
                        required>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Trans'>Trans</option>
                      </Form.Select> */}
                      <Form.Select name='gender' value={formData.gender || ""} onChange={handleChange} required>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
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
                        name='dateOfBirth'
                        value={formData.dateOfBirther || ""}
                        onChange={handleChange}
                        required
                        // value={formData[`${level2}dateOfBirth`] || ""}
                        // onChange={handleChange}
                        // required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>Religion</Form.Label>

                      <Form.Select
                        // name={`${level2}religion`}
                        // value={formData[`${level2}religion`] || ""} // Ensure a default empty value
                        // onChange={(e) => setFormData({ ...formData, [`${level2}religion`]: e.target.value })} // Fix the key here
                        // required>
                        name='religion'
                        value={formData.religion || ""}
                        onChange={handleChange}
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
                        // name={`${level2}birthCertificateNo`}
                        // value={formData[`${level2}birthCertificateNo`] || ""}
                        // onChange={handleChange}
                        // required

                        name='birthCertificateNo'
                        value={formData.birthCertificateNo || ""}
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
                        // name={`${level2}nationality`}
                        // value={formData[`${level2}nationality`] || ""}
                        // onChange={handleChange}
                        // required

                        name='nationality'
                        value={formData.nationality || ""}
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
                        // name={`${level2}facebookProfileLink`}
                        // value={formData[`${level2}facebookProfileLink`] || ""}
                        // onChange={handleChange}
                        // required

                        name='facebookProfileLink'
                        value={formData.facebookProfileLink || ""}
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
                        // name={`${level2}linkedInProfileLink`}
                        // value={formData[`${level2}linkedInProfileLink`] || ""}
                        // onChange={handleChange}
                        // required
                        name='linkedInProfileLink'
                        value={formData.linkedInProfileLink || ""}
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
                        // name={`${level2}fathersName`}
                        // value={formData[`${level2}fathersName`] || ""}
                        // onChange={handleChange}
                        // required

                        name='fathersName'
                        value={formData.fathersName || ""}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Father&apos;s Number
                        <span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Father Number'
                        type='text'
                        // name={`${level2}fathersNumber`}
                        // value={formData[`${level2}fathersNumber`] || ""}
                        // onChange={handleChange}
                        // required

                        name='fathersNumber'
                        value={formData.fathersNumber || ""}
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
                        // name={`${level2}mothersName`}
                        // value={formData[`${level2}mothersName`] || ""}
                        // onChange={handleChange}
                        // required

                        name='mothersName'
                        value={formData.mothersName || ""}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='text-white'>
                        Mother&apos;s Number
                        <span className='text-danger'>*</span>
                      </Form.Label>

                      <Form.Control
                        placeholder='Enter Mother Number'
                        type='text'
                        // name={`${level2}mothersNumber`}
                        // value={formData[`${level2}mothersNumber`] || ""}
                        // onChange={handleChange}
                        // required

                        name='mothersNumber'
                        value={formData.mothersNumber || ""}
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
                        value={formData[`${level3}emergencyName`] || ""}
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
                        value={formData[`${level3}emergencyRelation`] || ""}
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
                        value={formData[`${level3}emergencyNumber`] || ""}
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
                        value={formData[`${level3}emergencyAddress`] || ""}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}
            <div className='d-flex justify-content-center mt-3'>
              {/* <Button
                style={{ backgroundColor: "rgb(40, 28, 79)", borderColor: "rgb(40, 28, 79)" }}
                onClick={() => alert("Form Submitted Successfully")}>
                Save
              </Button> */}

              {/* <Button style={{ backgroundColor: "rgb(40, 28, 79)", borderColor: "rgb(40, 28, 79)" }} type='submit'>
                Save
              </Button> */}

              <Button
                style={{
                  backgroundColor: "rgb(40, 28, 79)",
                  borderColor: "rgb(40, 28, 79)",
                }}
                onClick={handleSave} // ✅ Ensure it explicitly calls handleSave
              >
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
