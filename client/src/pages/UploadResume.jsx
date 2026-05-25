import { useState } from "react";
import axios from "axios";

function UploadResume() {

  const [file, setFile] = useState(null);

  const [questions, setQuestions] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a resume");
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

      alert("Error generating questions");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-8">
        SmartPrep AI
      </h1>

      <div className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-2xl">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

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

          <p className="mt-4 text-lg font-semibold">
            AI is generating interview questions...
          </p>

          </div>
        )
      }

      {
        questions && (

          <div  className="mt-10 w-full max-w-4xl bg-white shadow-xl p-10 rounded-2xl whitespace-pre-wrap">

            <h2 className="text-4xl font-bold mb-8">
              AI Interview Questions
            </h2>

            <div className="leading-8 text-gray-700">
              {questions}
            </div>

          </div>
          )
      }

    </div>
  );
}

export default UploadResume;