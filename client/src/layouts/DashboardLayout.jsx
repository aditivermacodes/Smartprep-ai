import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {

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

  return (

    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-all duration-300">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 overflow-y-auto">

        {/* TOPBAR */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* PAGE CONTENT */}

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;
