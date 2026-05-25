import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-64 h-screen bg-gray-900 text-white p-6">

      <h2 className="text-3xl font-bold mb-10">
        SmartPrep
      </h2>

      <div className="flex flex-col gap-6">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/upload-resume">
          Upload Resume
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;