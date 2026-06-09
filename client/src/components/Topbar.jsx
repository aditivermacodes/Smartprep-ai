import { useNavigate } from "react-router-dom";

function Topbar({ darkMode, setDarkMode, setSidebarOpen }) {

  const navigate = useNavigate();


  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-5 flex items-center justify-between transition-all duration-300">

      {/* LEFT */}

      <div className="flex items-center gap-2 md:gap-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-2xl text-gray-900 dark:text-white"
        >
          ☰
        </button>

        <div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            SmartPrep AI
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            AI-Powered Interview Preparation Platform
          </p>

        </div>

      </div>  

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* DARK MODE */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-gray-200 dark:bg-gray-800 dark:text-white px-3 md:px-5 py-2 md:py-3 rounded-2xl font-semibold transition hover:scale-105"
        >

          {
            darkMode
              ? "☀️ Light"
              : "🌙 Dark"
          }

        </button>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-3 md:px-5 py-2 md:py-3 rounded-2xl font-semibold transition hover:scale-105"
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Topbar;