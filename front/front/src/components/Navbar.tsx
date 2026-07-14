
import logo from "../assets/logo.png";
import { Link } from "react-router";



const Navbar = () => {
  
  return (
    <div className="navbar justify-center bg-black  w-full ">

      <div className="navbar-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-25  w-50 " />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
