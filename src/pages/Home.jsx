import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
//import homeImage1 from "../assets/home1.png";
import homeImage2 from "../assets/home2.1.png";
//import homeImage3 from "../assets/home3.png";
import homeImage4 from "../assets/home4.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className='container-fluid home-container py-5'>
        <div className='row align-items-center'>
          {/* Left Content */}
          <div className='col-lg-6 text-center text-lg-start '>
            <h1 className='display-4 fw-bold text-primary ms-lg-5'>
              Best <span className='text-success'>Tutoring Platform</span>
            </h1>
            <h2 className='text-secondary fw-semibold ms-lg-5'>for Home & Online Tuitions</h2>
            <p className='text-muted mt-3'>
              <i className='bi bi-geo-alt-fill text-primary ms-lg-5'></i> Find the Right Tutor in Your Area
            </p>
            {/* Button with Gradient */}
            <button
              className='btn btn-lg mt-4 px-4 text-light fw-bold ms-lg-5'
              style={{
                backgroundColor: "rgb(40, 28, 79)",
                border: "none",
              }}>
              <i className='bi bi-search me-2'></i> Find a Tutor
            </button>
          </div>

          {/* Right Illustration */}
          <div className='col-lg-6 text-center mt-5 mt-lg-0'>
            <img
              src={homeImage4} // Replace this URL with the actual image path
              alt='Tutor Illustration'
              className='img-fluid'
            />
          </div>
        </div>
      </div>

      <div className='container-fluid d-flex align-items-center justify-content-center'>
        <div className='text-center'>
          <h2 className='text-dark fw-bold'>SEARCH TUTORING JOBS</h2>
          <h4 className='text-secondary'>Find Your Tuition Jobs, in your area</h4>
        </div>
      </div>

      <div className='container-fluid py-5'>
        <div className='row align-items-center justify-content-center text-center'>
          {/* Left Illustration */}
          <div className='col-lg-6 text-center'>
            <img
              src={homeImage2} // Replace with the actual image path
              alt='Search Tutoring Jobs Illustration'
              className='img-fluid'
            />
          </div>

          {/* Right Content */}
          <div className='col-lg-6 d-flex flex-column justify-content-center align-items-center'>
            <div className='text-muted'>
              <div className='text-dark fs-4'>
                Looking for interesting tuition jobs to excel your teaching experience?
              </div>
              <div className='mt-2 p-4'>
                If teaching jobs interest you, then you are on the right place. We often have{" "}
                <strong className='text-danger'>500+</strong> open home tuition jobs that are genuine and{" "}
                <strong className='text-danger'>100% verified</strong>. Whether you are starting your career as a
                tuition teacher or an expert in your field, we can help you find your next big tuition job. You can
                search and apply to the tuition jobs that best fit your skills, favorable location, class, and subjects.
              </div>
            </div>

            <button
              className='btn btn-lg text-white px-4 fw-bold'
              style={{
                background: "rgb(40, 28, 79)",
                border: "none",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}>
              <i className='bi bi-search me-2'></i> Search Tuition →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
