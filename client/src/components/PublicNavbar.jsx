import { Link } from "react-router-dom";

function PublicNavbar() {

  return (

    <nav className="flex justify-between items-center px-10 py-6 bg-black text-white">

      <h1 className="text-3xl font-bold">
        SmartPrep AI
      </h1>

      <div className="flex gap-6 items-center">

        <Link
          to="/login"
          className="hover:text-gray-300"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl"
        >
          Get Started
        </Link>

      </div>

    </nav>
  );
}

export default PublicNavbar;