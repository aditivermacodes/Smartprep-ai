import { Link, useLocation } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

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
    {
      name: "Interview History",
      path: "/interview-history",
    },
    {
      name: "ATS Score",
      path: "/ats-score",
    },
  ];

  return (

    <>

      {/* BACKDROP */}

      {
        sidebarOpen && (

          <div
            onClick={() =>
              setSidebarOpen(false)
            }
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )
      }

      {/* SIDEBAR */}

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-72 bg-black text-white p-8 flex flex-col z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* CLOSE BUTTON */}

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="lg:hidden self-end text-2xl mb-6"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-12">
          SmartPrep AI
        </h1>

        <div className="flex flex-col gap-4">

          {
            links.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={() =>
                  setSidebarOpen(false)
                }
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

    </>
  );
}

export default Sidebar;
