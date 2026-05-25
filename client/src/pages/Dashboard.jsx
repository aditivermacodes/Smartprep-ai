function Dashboard() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-10">
        Welcome to SmartPrep AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold">
            Interviews
          </h2>

          <p className="text-4xl mt-4">
            12
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold">
            Questions Solved
          </h2>

          <p className="text-4xl mt-4">
            85
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold">
            AI Score
          </h2>

          <p className="text-4xl mt-4">
            92%
          </p>

        </div>

      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-6 py-3 rounded-lg mt-10"
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;