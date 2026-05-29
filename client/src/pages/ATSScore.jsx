import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";

function ATSScore() {

  const [analysis, setAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [score, setScore] = useState(null);

  // =========================
  // ANALYZE RESUME
  // =========================

  const analyzeResume = async () => {

    if (!file) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("resume",file);

      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/ats/analyze-pdf`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setAnalysis(res.data.analysis);
      const match = res.data.analysis.match(/(\d{1,3})\/100/);
      if(match) {
        setScore(match[1]);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(analysis, 180);

    //TITLE
    doc.setFontSize(22);
    doc.text("ATS Resume Report", 20, 20);
    //CONTENT
    doc.setFontSize(12);
    doc.text(lines, 20, 40);
    //DOWNLOAD
    doc.save("ats-resume-report.pdf");
  }

  // =========================
  // REMOVE FILE
  // =========================

  const removeFile = () => {

    setFile(null);
    setScore(null);
    setAnalysis("");
  };

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h2 className="text-5xl font-bold tracking-tight">

            ATS Resume Analyzer

          </h2>

          <p className="text-gray-500 mt-3 text-lg">

            Analyze your resume using AI-powered ATS scoring.

          </p>

        </div>

        {/* INPUT CARD */}

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 mb-10">

          <div className="space-y-6">

            {/* FILE UPLOAD */}

            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">

              <div className="flex flex-col items-center justify-center">

                <p className="text-4xl mb-4">

                  📄

                </p>

                <p className="text-xl font-semibold text-gray-700">

                  Upload Resume PDF

                </p>

                <p className="text-sm text-gray-500 mt-2">

                  Click or drag your resume here

                </p>

              </div>

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {

                  const selectedFile =
                    e.target.files[0];

                  if (selectedFile) {

                    setFile(selectedFile);

                    setAnalysis("");
                  }
                }}
              />

            </label>

            {/* FILE PREVIEW */}

            {
              file && (

                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-5 flex items-center justify-between">

                  <div>

                    <p className="font-semibold text-lg">

                      {file.name}

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      PDF Resume Ready

                    </p>

                  </div>

                  <button
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 transition font-semibold"
                  >

                    Remove

                  </button>

                </div>
              )
            }

            {/* ANALYZE BUTTON */}

            <div className="w-full flex items-center justify-center pt-2">

            <button
                onClick={analyzeResume}
                disabled={loading || !file}
                className={`w-[240px] py-4 rounded-2xl font-semibold text-white transition-all shadow-md ${
                loading || !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
            >

                {
                loading
                    ? "Analyzing Resume..."
                    : "Analyze Resume"
                }

            </button>

            </div>

          </div>

        </div>

        {/* LOADING */}

        {
          loading && (

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 flex justify-center mb-10">

              <div className="flex items-center gap-3">

                <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>

                <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce delay-100"></div>

                <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce delay-200"></div>

              </div>

            </div>
          )
        }
        {
          score && (

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 mb-10">

              <div className="flex flex-col items-center justify-center">

                <div className="relative w-48 h-48 rounded-full border-[12px] border-black flex items-center justify-center shadow-lg">

                  <div className="text-center">

                    <h2 className="text-5xl font-bold">

                      {score}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      ATS Score

                    </p>

                  </div>

                </div>

                <div className="w-full mt-8">

                  <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

                    <div
                      className="bg-black h-5 transition-all duration-1000"
                      style={{
                        width: `${score}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <p className="mt-4 text-gray-600 text-lg">

                  {
                    score >= 80
                      ? "Excellent Resume 🚀"
                      : score >= 60
                      ? "Good Resume 👍"
                      : "Needs Improvement 📈"
                  }

                </p>

              </div>

            </div>
          )
        }

        {
          analysis && (

            <div className="flex justify-center mb-8">
              <button
                onClick={downloadPDF}
                className = "bg-black hover:bg-gray-800 transition text-white px-8 py-4 rounded-2xl shadow-md font-semibold"
                >
                  Download PDF Report
              </button>
            </div>
        )
        }

        {/* ANALYSIS */}

        {
          analysis && (

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

              <div className="prose max-w-none">

                <ReactMarkdown>

                  {analysis}

                </ReactMarkdown>

              </div>

            </div>
          )
        }

      </div>

    </DashboardLayout>
  );
}

export default ATSScore;