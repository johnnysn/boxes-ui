import logo from "./assets/logo-prim.svg";

export default function Navbar() {
  return (
    <nav className="w-full bg-customdark text-white flex justify-between py-3 items-center border-b-primary border-b-2 px-2 sm:px-4 lg:px-6">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-11 md:w-16 mr-1" />
        <p className="font-semibold font-sans text-2xl md:text-3xl text-blue">
          Boxes
        </p>
      </div>

      <ul className="flex gap-3 justify-between items-center">
        <li>{/* <Link to="/">Main</Link> */}</li>
        <li>{/* <Link to="/data">Data</Link> */}</li>
        <li>{/* <Link to="/about">About</Link> */}</li>
      </ul>
    </nav>
  );
}
