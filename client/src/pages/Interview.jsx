import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Interview() {

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `# Welcome to SmartPrep AI 👋

I'm your AI interview coach.

Let's begin your mock interview.

## First Question

Tell me about yourself.`,
      time: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // AUTO SCROLL

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // SEND MESSAGE

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
        }
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

        {/* HEADER */}

        <div className="mb-8">

          <h2 className="text-5xl font-bold tracking-tight">

            AI Mock Interview

          </h2>

          <p className="text-gray-500 mt-3 text-lg">

            Practice realistic AI-powered technical interviews.

          </p>

        </div>

        {/* CHAT CONTAINER */}

        <div className="flex-1 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-xl border border-gray-200 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">

          {/* EMPTY STATE */}

          {
            messages.length === 1 && (

              <div className="flex justify-center mb-10">

                <div className="bg-white border border-gray-200 shadow-md rounded-3xl px-8 py-6 text-center max-w-xl">

                  <h3 className="text-2xl font-bold mb-3">

                    Ready for your interview?

                  </h3>

                  <p className="text-gray-500 leading-7">

                    Answer naturally and the AI will evaluate your responses,
                    provide feedback, and continue the interview.

                  </p>

                </div>

              </div>
            )
          }

          {/* MESSAGES */}

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-8 flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`flex items-end gap-3 ${
                    msg.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >

                  {/* AVATAR */}

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-black text-white"
                    }`}
                  >

                    {msg.role === "user" ? "U" : "AI"}

                  </div>

                  {/* MESSAGE */}

                  <div
                    className={`max-w-[80%] px-6 py-5 rounded-3xl leading-8 shadow-md transition-all prose prose-sm max-w-none ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-auto"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >

                    <ReactMarkdown>

                      {msg.text}

                    </ReactMarkdown>

                    {/* TIME */}

                    <p className="text-xs mt-4 opacity-70">

                      {
                        new Date(msg.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }

                    </p>

                  </div>

                </div>

              </div>
            ))
          }

          {/* TYPING INDICATOR */}

          {
            loading && (

              <div className="mb-8 flex justify-start">

                <div className="flex items-end gap-3">

                  {/* AI AVATAR */}

                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-md">

                    AI

                  </div>

                  {/* TYPING */}

                  <div className="bg-white border border-gray-200 shadow-md px-6 py-5 rounded-3xl">

                    <div className="flex items-center gap-2">

                      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>

                      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-100"></div>

                      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-200"></div>

                    </div>

                  </div>

                </div>

              </div>
            )
          }

          <div ref={messagesEndRef}></div>

        </div>

        {/* INPUT SECTION */}

        <div className="flex gap-4 mt-6 bg-white p-4 rounded-3xl shadow-lg border border-gray-200">

          <input
            type="text"
            value={input}
            disabled={loading}
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();
              }
            }}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Type your answer..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-8 py-4 rounded-2xl font-semibold text-white transition-all shadow-md ${
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