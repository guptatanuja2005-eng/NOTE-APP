import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../assets/context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setErrorMessage(message);
      console.log(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">LOGIN</h2>

        {errorMessage && (
          <p className="mb-4 text-red-600 text-sm">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="******"
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="w-full bg-teal-600 text-white py-2">
              LOGIN
            </button>

            <p className="text-center">
              Don't Have Account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
