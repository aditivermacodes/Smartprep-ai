import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Interview() {

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Welcome to SmartPrep AI Interview 👋\n\nTell me about yourself.",
    },
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // AUTO SCROLL

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const sendMessage = () => {

    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,

      {
        role: "user",
        text: input,
      },
    ]);

    setInput("");
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
                  className={`max-w-[75%] px-5 py-4 rounded-2xl whitespace-pre-wrap leading-7 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>

              </div>
            ))
          }

          <div ref={messagesEndRef}></div>

        </div>

        {/* INPUT */}

        <div className="flex gap-4 mt-6">

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Type your answer..."
            className="flex-1 bg-white border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            className="bg-black hover:bg-gray-800 transition text-white px-8 rounded-2xl"
          >
            Send
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Interview;