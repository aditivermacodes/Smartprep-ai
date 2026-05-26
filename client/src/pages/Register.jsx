import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

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

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 shadow-lg rounded-xl bg-white"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-black text-white w-full p-3 rounded hover:bg-gray-800 transition"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-600">

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