import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token =
          localStorage.getItem("token");

        // HISTORY

        const historyRes =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/history`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setHistory(historyRes.data);

        // ANALYTICS

        const analyticsRes =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/interview/analytics`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setAnalytics(analyticsRes.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <div className="text-2xl font-semibold animate-pulse text-gray-900 dark:text-white">

            Loading Dashboard...

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">

          Dashboard

        </h2>

        <p className="text-gray-500 dark:text-gray-300 mt-3 text-lg">

          Track your AI interview preparation journey.

        </p>

      </div>

      {/* ANALYTICS */}

      {
        analytics && (

          <>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <div className="bg-white dark:bg-gray-800 p-7 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-200 dark:border-gray-700">

                <p className="text-gray-500 dark:text-gray-400 text-sm">

                  Total Interviews

                </p>

                <h3 className="text-5xl font-bold mt-4 text-gray-900 dark:text-white">

                  {analytics.totalInterviews}

                </h3>

              </div>

              <div className="bg-white dark:bg-gray-800 p-7 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-200 dark:border-gray-700">

                <p className="text-gray-500 dark:text-gray-400 text-sm">

                  Total Messages

                </p>

                <h3 className="text-5xl font-bold mt-4 text-gray-900 dark:text-white">

                  {analytics.totalMessages}

                </h3>

              </div>

              <div className="bg-white dark:bg-gray-800 p-7 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-200 dark:border-gray-700">

                <p className="text-gray-500 dark:text-gray-400 text-sm">

                  Average Messages

                </p>

                <h3 className="text-5xl font-bold mt-4 text-gray-900 dark:text-white">

                  {analytics.averageMessages}

                </h3>

              </div>

            </div>

            {/* CHART */}

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md mb-12 border border-gray-200 dark:border-gray-700">

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">

                    Interview Activity

                  </h3>

                  <p className="text-gray-500 mt-2">

                    Your recent interview engagement.

                  </p>

                </div>

              </div>

              <div className="h-96">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={analytics.analyticsData}
                  >

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="messages"
                      stroke="#2563eb"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

          </>
        )
      }

      {/* RECENT SESSIONS */}

      <div className="mb-8">

        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">

          Recent Sessions

        </h3>

        <p className="text-gray-500 dark:text-gray-300 mt-2">

          Your latest AI-generated interview sessions.

        </p>

      </div>

      {
        history.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-md text-center border border-gray-200 dark:border-gray-700">

            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">

              No Sessions Yet

            </h3>

            <p className="text-gray-500 dark:text-gray-300">

              Start an AI interview to see your
              history here.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {
              history.map((item) => (

                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 p-7 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
                >

                  <div className="flex justify-between items-center mb-5">

                    <p className="text-sm text-gray-500 dark:text-gray-400">

                      {
                        new Date(
                          item.createdAt
                        ).toLocaleString()
                      }

                    </p>

                    <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">

                      AI Session

                    </div>

                  </div>

                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 leading-7">

                    {item.questions.slice(0, 300)}...

                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </DashboardLayout>
  );
}

export default Dashboard;