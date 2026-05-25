import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(

          "http://localhost:5000/api/history",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchHistory();

  }, []);

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
        Previous AI Interview Sessions
      </p>

      <div className="space-y-6">

        {
          history.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              <p className="text-sm text-gray-500 mb-4">
                {
                  new Date(
                    item.createdAt
                  ).toLocaleString()
                }
              </p>

              <div className="whitespace-pre-wrap text-gray-700">
                {item.questions.slice(0, 300)}...
              </div>

            </div>
          ))
        }

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