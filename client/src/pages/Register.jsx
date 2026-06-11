import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

        setLoading(true);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          formData
        );

        setError(false);

        setMessage(
          res.data.message || "Registration successful!"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (error) {

        setError(true);

        setMessage(
          error.response?.data?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">

      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 shadow-lg rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Register
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-3 mb-4 rounded"
          onChange={handleChange}
          required
        />

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
          autoComplete="new-password"
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
        disabled={loading}
        className={`w-full p-3 rounded transition text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {
          loading
            ? "Creating Account..."
            : "Register"
        }
      </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;