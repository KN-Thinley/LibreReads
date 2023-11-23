import logo from "../img/logo.png";
import { Link } from "react-router-dom"
const AdminLoginNav = () => {
  return (
    <nav className="w-full flex justify-center p-4">
      <div className="flex">
        <Link to={"/"}>
          <img src={logo} alt="" className="h-16" />
        </Link>
      </div>
    </nav>
  );
};

export default AdminLoginNav;
