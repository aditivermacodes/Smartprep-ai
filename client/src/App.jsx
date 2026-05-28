import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadResume from "./pages/UploadResume";
import Interview from "./pages/Interview";
import InterviewHistory from "./pages/InterviewHistory";
import ATSScore from "./pages/ATSSCore";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/upload-resume" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />

        <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />

        <Route path="/interview-history" element={<ProtectedRoute><InterviewHistory /></ProtectedRoute>} />

        <Route path="/ats-score" element={<ProtectedRoute><ATSScore /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
