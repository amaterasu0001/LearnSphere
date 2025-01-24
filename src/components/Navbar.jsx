import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Home </Link>
      <Link to='/AboutUs'>AboutUs </Link>
      <Link to='/Login'>Login </Link>
      <Link to='/Profile'>Profile </Link>
      <Link to='/SignUp'>SignUp </Link>
    </nav>
  );
};

export default Navbar;
