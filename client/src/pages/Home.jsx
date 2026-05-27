import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

function Home() {

  return (

    <PublicLayout>

      {/* HERO */}

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <h1 className="text-7xl font-bold leading-tight">

            Ace Your <span className="text-blue-500">
              Technical Interviews
            </span> with AI

          </h1>

          <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto leading-8">

            Upload your resume, practice AI-powered
            mock interviews, and track your progress
            with SmartPrep AI.

          </p>

          <div className="flex justify-center gap-6 mt-10">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-700 hover:bg-gray-900 transition px-8 py-4 rounded-xl"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

      {/* FEATURES */}

      <div className="max-w-6xl mx-auto px-8 pb-24">

        <h2 className="text-5xl font-bold text-center mb-20">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

            <h3 className="text-2xl font-bold mb-4">
              AI Interview Generation
            </h3>

            <p className="text-gray-400 leading-7">
              Generate personalized technical interview
              questions directly from your resume.
            </p>

          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

            <h3 className="text-2xl font-bold mb-4">
              AI Mock Interviews
            </h3>

            <p className="text-gray-400 leading-7">
              Practice realistic AI-driven interviews
              with intelligent follow-up questions.
            </p>

          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

            <h3 className="text-2xl font-bold mb-4">
              Analytics Dashboard
            </h3>

            <p className="text-gray-400 leading-7">
              Track your interview history, scores,
              and improvement areas over time.
            </p>

          </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default Home;