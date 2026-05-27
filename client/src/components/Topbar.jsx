function Topbar() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (

    <div className="bg-white shadow-md rounded-2xl px-8 py-5 flex justify-between items-center mb-8">

      {/* LEFT */}

      <div>

        <h1 className="text-3xl font-bold">
          SmartPrep AI
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋
        </p>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* AVATAR */}

        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">

          A

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="bg-black hover:bg-gray-800 transition text-white px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;