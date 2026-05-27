import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(

          `${import.meta.env.VITE_API_URL}/api/history`,

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

  return (

    <DashboardLayout>

      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          Previous AI Sessions
        </h2>

        <p className="text-gray-500 mt-2">
          Review your interview history and AI-generated questions.
        </p>

      </div>

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

    </DashboardLayout>
  );
}

export default Dashboard;