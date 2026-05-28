import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Interview() {

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Welcome to SmartPrep AI Interview 👋\n\nTell me about yourself.",
      time: new Date(),
    },
  ]);

  const [input, setInput] = useState("");

  const[loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // AUTO SCROLL

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
      time: new Date(),
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setInput("");

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/interview/chat`,

        {
          messages: updatedMessages,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
        time: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <DashboardLayout>

      <div className="flex flex-col h-[85vh]">

        {/* TITLE */}

        <div className="mb-6">

          <h2 className="text-4xl font-bold">
            AI Mock Interview
          </h2>

          <p className="text-gray-500 mt-2">
            Practice realistic AI-powered interviews.
          </p>

        </div>

        {/* CHAT CONTAINER */}

        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-6 flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-5 py-4 rounded-2xl leading-7 prose ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                  <p className="text-xs mt-3 opacity-70">
                    {
                      new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }
                  </p>
                </div>

              </div>
            ))
          }
          {loading && (
            <div className="mb-6 flex justify-start">
              <div className="max-w-[75%] px-5 py-4 rounded-2xl whitespace-pre-wrap leading-7 bg-gray-100 text-gray-800 animate-pulse">
                <div className="flex items-center gap-2">

                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>

                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-100"></div>

                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-200"></div>

              </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>

        </div>

        {/* INPUT */}

        <div className="flex gap-4 mt-6">

          <input
            type="text"
            value={input}
            diabled={loading}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Type your answer..."
            className="flex-1 bg-white border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-8 rounded-2xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            Send
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Interview;