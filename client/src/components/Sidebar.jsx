import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Upload Resume",
      path: "/upload-resume",
    },

    {
      name: "AI Interview",
      path: "/interview",
    },
  ];

  return (

    <div className="w-72 bg-black text-white p-8 flex flex-col">

      <h1 className="text-3xl font-bold mb-12">
        SmartPrep AI
      </h1>

      <div className="flex flex-col gap-4">

        {
          links.map((link) => (

            <Link
              key={link.path}
              to={link.path}
              className={`p-4 rounded-xl transition ${
                location.pathname === link.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))
        }

      </div>

    </div>
  );
}

export default Sidebar;