import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <div>
      <footer className='bg-dark text-center text-white'>
        <div className='text-center p--1' style={{ backgroundColor: "rgb(0, 0, 0)" }}>
          © 2025 LearnSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
