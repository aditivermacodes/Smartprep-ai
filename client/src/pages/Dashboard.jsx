function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="text-center mt-20">

      <h1 className="text-5xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome to SmartPrep AI
      </p>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-6">
        Logout
      </button>

    </div>
  );
}

export default Dashboard;