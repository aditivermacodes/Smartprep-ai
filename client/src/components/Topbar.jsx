import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  // =========================
  // DARK MODE
  // =========================

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem("theme") === "dark"
    );

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

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

      <div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">

          SmartPrep AI

        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1">

          AI-Powered Interview Preparation Platform

        </p>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* DARK MODE */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-gray-200 dark:bg-gray-800 dark:text-white px-5 py-3 rounded-2xl font-semibold transition hover:scale-105"
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
          className="bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-5 py-3 rounded-2xl font-semibold transition hover:scale-105"
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Topbar;