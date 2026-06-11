import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setError(false);
      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setError(true);
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };


  return (

    

    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">

      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 shadow-lg rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h2>

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          placeholder="Password"
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 mb-4 rounded"
          onChange={handleChange}
          required
        />

        {
          message && (

            <div
              className={`mb-4 p-3 rounded-lg text-center font-medium ${
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
          type="submit"
          className="bg-black text-white w-full p-3 rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-500 dark:text-gray-300 mt-4">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;