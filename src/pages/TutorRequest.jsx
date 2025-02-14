import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Row, Col, Button } from "react-bootstrap";

const TutorRequestForm = () => {
  useEffect(() => {
    const rootElement = document.documentElement;
    const formContainer = document.getElementById("form-container");

    const applyTheme = () => {
      const darkMode = rootElement.classList.contains("dark-mode");
      if (darkMode) {
        formContainer.classList.add("bg-dark", "text-light");
        formContainer.classList.remove("bg-light", "text-dark");
      } else {
        formContainer.classList.add("bg-light", "text-dark");
        formContainer.classList.remove("bg-dark", "text-light");
      }
    };

    applyTheme();

    const observer = new MutationObserver(applyTheme);
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id='form-container'
      className='p-4 rounded bg-light text-dark'
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        backgroundImage: 'url("/path/to/background-image.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='text-center' style={{ color: "var(--primary-color, #4A148C)" }}>
          Tutor Request Form
        </h2>
      </div>

      <Form>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formFullName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type='text' placeholder='Enter your full name' />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formDistrict'>
              <Form.Label>Select District</Form.Label>
              <Form.Select>
                <option>Select District</option>
                <option>District 1</option>
                <option>District 2</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formArea'>
              <Form.Label>Select Area</Form.Label>
              <Form.Select>
                <option>Select Area</option>
                <option>Area 1</option>
                <option>Area 2</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formMedium'>
              <Form.Label>Select Medium</Form.Label>
              <Form.Select>
                <option>Select Medium</option>
                <option>English</option>
                <option>Bengali</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formClass'>
              <Form.Label>Select Class</Form.Label>
              <Form.Select>
                <option>Select Class</option>
                <option>Class 1</option>
                <option>Class 2</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formSubject'>
              <Form.Label>Select Subject</Form.Label>
              <Form.Select>
                <option>All Subjects</option>
                <option>Math</option>
                <option>Science</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formStudentSchool'>
              <Form.Label>Student School/College</Form.Label>
              <Form.Control type='text' placeholder='Enter school/college name' />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formDaysPerWeek'>
              <Form.Label>Days per Week</Form.Label>
              <Form.Select>
                <option>3 days/week</option>
                <option>5 days/week</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formGender'>
              <Form.Label>Gender of Student</Form.Label>
              <Form.Select>
                <option>Any Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formSalaryRange'>
              <Form.Label>Salary Range</Form.Label>
              <Form.Control type='text' placeholder='Enter salary range' />
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formTutorGender'>
              <Form.Label>Desired Tutor Gender</Form.Label>
              <Form.Select>
                <option>Any Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formAddress'>
              <Form.Label>Detail Address</Form.Label>
              <Form.Control type='text' placeholder='Enter address' />
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formMobile'>
              <Form.Label>Mobile</Form.Label>
              <Form.Control type='text' placeholder='Enter mobile number' />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
          </Col>
        </Row>

        <Button
          type='submit'
          className='w-100 mt-3'
          style={{
            backgroundColor: "rgb(40, 28, 79)", // Primary color
            borderColor: "rgb(40, 28, 79)", // Border color matching the background
            color: "#fff", // Text color
            borderRadius: "8px", // Rounded corners
            fontWeight: "bold", // Bold text
            padding: "10px", // Adequate padding
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            transition: "background-color 0.3s ease", // Smooth hover transition
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4A148C")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(40, 28, 79)")}>
          Submit
        </Button>
      </Form>

      <div className='mt-4 p-3 rounded shadow-sm bg-secondary text-light'>
        <h5>Help & Info:</h5>
        <p>
          <strong>Q. If I cant get the desired tutor?</strong> <br /> Just fill up the request tutor form and send it to
          us. We will try to find your desired tutor.
        </p>
        <p>
          <strong>Q. What will happen after filling the form?</strong> <br /> After filling up the form, the information
          will be sent to our support team. They will review/verify the info and publish it in the available tuitions
          section.
        </p>
      </div>
    </div>
  );
};

export default TutorRequestForm;
