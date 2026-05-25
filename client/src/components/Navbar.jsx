import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
        SmartPrep AI
      </h1>

      <div className="flex gap-6">

        <Link
          to="/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/upload-resume"
          className="hover:text-gray-300"
        >
          Upload
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;