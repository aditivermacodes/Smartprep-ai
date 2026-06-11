import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";

function UploadResume() {

  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      setError(true);
      setMessage("Please select a resume");
      return;
    }

    try {

      setLoading(true);

      // FORM DATA
      const formData = new FormData();

      formData.append("resume", file);

      // UPLOAD RESUME
      const uploadRes = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/resume/upload`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText =
        uploadRes.data.extractedText;

      // GENERATE QUESTIONS
      const token = localStorage.getItem("token");

      const aiRes = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/ai/generate`,

        {
          resumeText: extractedText,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(aiRes.data.questions);

    } catch (error) {

      console.log(error);
      setError(true);
      setMessage("Error generating questions");

    } finally {

      setLoading(false);
    }
  };

  return (

    <DashboardLayout>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        SmartPrep AI
      </h1>

      <div className="bg-white dark:bg-gray-700 shadow-xl p-10 rounded-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        {
          message && (

            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium w-full max-w-2xl ${
                error
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >

              {message}

            </div>
          )
        }

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold"
        >
          Generate Interview Questions
        </button>

      </div>

      {
        loading && (
          <div className="mt-8 flex flex-col items-center">

          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            AI is generating interview questions...
          </p>

          </div>
        )
      }

      {
        questions && (

          <div  className="mt-10 w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl p-10 rounded-2xl whitespace-pre-wrap border border-gray-200 dark:border-gray-700">

            <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              AI Interview Questions
            </h2>

            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>
              {questions}
              </ReactMarkdown>
            </div>

          </div>
          )
      }
      </div>

    </DashboardLayout>
  );
}

export default UploadResume;