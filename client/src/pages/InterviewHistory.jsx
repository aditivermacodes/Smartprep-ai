import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function InterviewHistory() {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    const fetchSessions = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(

          `${import.meta.env.VITE_API_URL}/api/interview/sessions`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSessions(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchSessions();

  }, []);

  return (

    <DashboardLayout>

      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          Interview Sessions
        </h2>

        <p className="text-gray-500 mt-2">
          Review your previous AI interviews.
        </p>

      </div>

      <div className="space-y-6">

        {
          sessions.map((session) => (

            <div
              key={session._id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >

              <p className="text-gray-500 mb-4">
                {
                  new Date(
                    session.createdAt
                  ).toLocaleString()
                }
              </p>

              <div className="space-y-4 mt-6">
                {
                    session.messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`p-4 rounded-xl ${
                        msg.role === "user"
                            ? "bg-blue-600 text-white ml-auto max-w-[80%]"
                            : "bg-gray-100 text-gray-800 max-w-[80%]"
                        }`}
                    >

                        <div className="space-y-2">

                        {
                            msg.text
                            .split("\n")
                            .map((line, i) => (

                                <p key={i}>
                                {line}
                                </p>
                            ))
                        }

                        </div>

                        <p className="text-xs mt-3 opacity-70">

                        {
                            new Date(msg.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            })
                        }

                        </p>

                    </div>
                    ))
                }

                </div>

            </div>
          ))
        }

      </div>

    </DashboardLayout>
  );
}

export default InterviewHistory;
