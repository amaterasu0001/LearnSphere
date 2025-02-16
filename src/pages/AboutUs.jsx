import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
//import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

const AboutUs = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // Handle modal show and hide
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <section className='about-us-section py-1'>
        <Container className='mt-4'>
          <Row className='w-100'>
            <Col className='px-1 custom'>
              <h2 className='text-center mb-4' style={{ fontWeight: "bold", fontSize: "2rem" }}>
                Our Beliefs
              </h2>
              <p style={{ lineHeight: "1.6rem", textAlign: "center" }}>
                At LearnSphere.com, we believe that every student deserves a personal tutor, and we are dedicated to
                promoting equity, opportunity, and achievement for all learners. To that end, we partner with colleges
                and universities, K-12 schools and districts, public and state libraries, employee benefits programs,
                and the U.S. military to provide 24/7, on-demand tutoring and homework help in more than 250 subjects.
              </p>
              <p style={{ lineHeight: "1.6rem", textAlign: "center" }}>
                Our mission is to instill hope, advance equity, and catalyze achievement in schools and communities. We
                do this by providing encouraging, empowering, and effective academic and professional support for
                learners of all ages and stages—from kindergarten through college, graduate school, career, and
                continuing education.
              </p>
              <p style={{ lineHeight: "1.6rem", textAlign: "center" }}>
                Over more than two decades of supporting students, educators, school leaders, and families, we have
                helped institutions increase student pass and persistence rates, and learners become more confident in
                their schoolwork.
              </p>
              <p style={{ lineHeight: "1.6rem", textAlign: "center" }}>
                Our learner satisfaction rates remain consistently high: 97 percent of post-session survey respondents
                would recommend LearnSphere.com to a friend, and 98 percent are glad their institution offers
                LearnSphere.com. The feeling is mutual.
              </p>
              <p style={{ lineHeight: "1.6rem", textAlign: "justify" }}>
                We are honored to partner with institutions and organizations to help them scale the human connection
                and provide personalized support—anytime, anywhere.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className='mt-5'>
          <Row className='text-center'>
            <Col>
              <h2>Our Instructors</h2>
              <p>
                Each year, LearnSphere receives over 80,000 applications from aspiring instructors. Every candidate
                undergoes a comprehensive evaluation to ensure they meet our high standards. Applicants must showcase
                their expertise in the subject area, proven teaching strategies, proficiency in our online platform, and
                alignment with LearnSphere educational philosophy and practices.
              </p>
            </Col>
          </Row>
          <Row className='text-center mt-4'>
            <Col md={4}>
              <Card className='hover-card'>
                <Card.Body>
                  <Card.Title>Rigorous Evaluation</Card.Title>
                  <Card.Text>
                    Applicants must demonstrate their subject-matter expertise, effective tutoring methodology, and
                    mastery of our online platform.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className='hover-card'>
                <Card.Body>
                  <Card.Title>Background Check</Card.Title>
                  <Card.Text>
                    Every candidate undergoes a thorough third-party background check to ensure the highest level of
                    safety and professionalism.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className='hover-card'>
                <Card.Body>
                  <Card.Title>Ongoing Support</Card.Title>
                  <Card.Text>
                    We provide continuous support and quality monitoring to ensure our instructors deliver impactful,
                    tailored learning experiences.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='text-center mt-4'>
            <Col>
              <p>On average, only 2% of applicants are selected to join the LearnSphere team.</p>
              <Button
                className='buttonLearnMore'
                variant='primary'
                onClick={handleShow}
                style={{
                  backgroundColor: "rgb(40, 28, 79)",
                  borderColor: "#800080",
                  padding: "10px 20px",
                }}>
                Learn More
              </Button>
            </Col>
          </Row>
        </Container>

        {/* Modal for Learn More */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Our Commitment to Accessibility</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              LearnSphere.com is an equity solution, and we are dedicated to ensuring that all students may access and
              benefit from the service. LearnSphere.com follows all ADA guidelines for accessibility and is ADA- and
              Section 508–compliant.
            </p>
            <p>
              To accommodate learning for physically challenged learners, we offer an accessible platform with a range
              of options, including chat and audio tutoring for hearing-impaired users. Sight-challenged learners can
              use our online classroom, where chat, file-sharing, and other tools are fully keyboard-operable and
              tab-navigable. The online classroom is also optimized for popular screen readers (e.g., JAWS, Kurzweil,
              NVDA, etc.), providing text equivalents for all non-text content. It includes all relevant page elements
              in the tab order so their proper reading sequence may be programmatically determined. The online classroom
              is further designed with motor disabilities in mind. Because our service is entirely web-based, with no
              required plugins or downloads, it does not interfere with third-party assistive technology or native OS
              accessibility functions like mouse keys, sticky keys, filter keys, or toggle keys.
            </p>
            <p>
              In addition to providing an accessible platform, we equip our tutors with specialized instructional
              techniques for a range of student learning needs.
            </p>

            {/* Additional Content for Data Protection */}
            <h3>Our Commitment to Data Protection</h3>
            <p>
              LearnSphere.com is a U.S. company with a two-decade legacy of supporting students. We abide by U.S. state
              and federal laws. Our headquarters are in New York City, and all student data is housed in the U.S.
            </p>
            <p>
              LearnSphere.com voluntarily initiated a rigorous federal review by the Committee on Foreign Investment in
              the United States (CFIUS) to ensure that stringent safeguards would be put in place to protect customer
              and student data, together with mechanisms that provide for constant monitoring and compliance. Our
              data-protection practices are therefore among the most comprehensive and well-enforced of any U.S.
              education services provider.
            </p>
            <p>
              At LearnSphere.com, we take data protection seriously, and we have a number of active controls in place to
              safeguard information, including a binding legal commitment to the U.S. government regarding the security
              of personal data and our IT systems.
            </p>
            <p>
              Additionally, we have a designated data security officer, vetted and approved by the U.S. government, to
              continuously monitor and ensure compliance with data-protection measures, as well as two independent
              directors on the LearnSphere.com board of directors, also vetted and approved by the U.S. government,
              whose foremost duty is to ensure that personal data is appropriately safeguarded. All of these individuals
              are U.S. citizens and security and compliance experts.
            </p>
            <p>
              As an American company, LearnSphere.com remains dedicated to the values, goals, and practices that we have
              championed over two decades of serving institutions and learners—foremost among which is protecting
              customer and learner data.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={handleClose}
              style={{
                backgroundColor: "rgb(40, 28, 79)", // Your desired color
                borderColor: "rgb(40, 28, 79)", // To match the border color
                color: "white", // Text color to ensure visibility
              }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
