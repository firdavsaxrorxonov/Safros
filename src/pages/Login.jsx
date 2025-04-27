import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import LoadingAnimation from "../assets/loading-animation.gif";

function Login() {
  const [loading, setLoading] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  let navigate = useNavigate();

  const token = Cookies.get("Token");
  if (token) {
    return <Navigate to="/qarzlar" replace />;
  }

  function handleNavigateHome() {
    async function handleLogin() {
      try {
        const response = await axios.post(
          "https://safros.up.railway.app/api/v1/login",
          {
            username: username,
            password: pwd,
          }
        );
        setLoading(false);
        Cookies.remove("Token");
        Cookies.set("Token", response.data.key);
        localStorage.removeItem("safros-userdata");
        localStorage.setItem(
          "safros-userdata",
          JSON.stringify({ username: username })
        );
        navigate("/qarzlar");
      } catch {
        setLoading(false);
        setError("Foydalanuvchi nomi yoki parol xato, Iltimos qayta uruning.");
      }
    }
    handleLogin();
  }

  return (
    <div className="flex min-h-dvh flex-col justify-start pt-14 px-4 overflow-y-auto relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          {!logoLoaded && (
            <div className="w-28 h-28 bg-gray-200 rounded animate-pulse" />
          )}
          <img
            alt="Your Company"
            src={logo}
            className={`w-28 mx-auto transition-opacity duration-500 ${
              logoLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
        <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-gray-900">
          Hisobga kirish
        </h2>
        <p className="text-center mt-1 text-red-600">{error}</p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
        <div>
          <label
            htmlFor="login"
            className="block text-sm font-medium text-gray-900"
          >
            Login
          </label>
          <input
            id="login"
            name="login"
            type="text"
            required
            autoComplete="login"
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Parol
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            onChange={(e) => {
              setPwd(e.target.value);
              setError("");
            }}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <button
            disabled={username.length === 0 || pwd.length === 0}
            onClick={() => {
              handleNavigateHome();
              setLoading(true);
            }}
            className="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Hisobingiz yo‘qmi?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Ro'yhatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
