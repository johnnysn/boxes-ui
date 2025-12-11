import logo from "../assets/logo-prim.svg";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="w-full bg-customdark text-white flex justify-between py-3 items-center border-b-primary border-b-2 px-2 sm:px-4 lg:px-6">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-11 md:w-16 mr-1" />
        <p className="font-semibold font-sans text-2xl md:text-3xl text-blue">
          Boxes
        </p>
      </Link>

      <ul className="flex gap-3 justify-between items-center">
        <li>
          <Link to="/" className="[&.active]:font-bold">
            Main
          </Link>
        </li>
        <li>
          <Link to="/signin" className="[&.active]:font-bold">
            Signin
          </Link>
        </li>
        <li>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
