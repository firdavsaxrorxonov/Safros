import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Register() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [repwd, setRepwd] = useState("");

  const passwordRegex = /^(?=.*[A-Za-z0-9]).{8,}$/;

  function handleRegisterClick(e) {
    e.preventDefault();

    if (!passwordRegex.test(pwd)) {
      setError(
        "Parol kamida 8 ta belgidan iborat bo‘lishi va kamida bitta raqam o‘z ichiga olishi kerak."
      );
      return;
    }

    if (pwd !== repwd) {
      setError("Parollar mos emas.");
      return;
    }

    async function handleRegister() {
      try {
        const response = await axios.post(
          "https://safros.up.railway.app/api/v1/registration/",
          {
            username: username,
            password1: pwd,
            password2: pwd,
          }
        );
        Cookies.remove("Token");
        Cookies.set("Token", response.data.key);
        localStorage.removeItem("safros-userdata");
        localStorage.setItem(
          "safros-userdata",
          JSON.stringify({ username: username })
        );
        navigate("/qarzlar");
      } catch (err) {
        console.log(err.response.data);
      }
    }
    handleRegister();
  }

  return (
    <div className="flex min-h-dvh flex-col justify-start pt-14 px-4 overflow-y-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          {!logoLoaded && (
            <div className="w-28 h-28 bg-gray-200 rounded animate-pulse" />
          )}
          <img
            alt="Your Company"
            src={logo}
            onLoad={() => setLogoLoaded(true)}
            className={`w-28 mx-auto transition-opacity duration-500 ${
              logoLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
          />
        </div>
        <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-gray-900">
          Ro'yhatdan o'tish
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
            onChange={(e) => setUsername(e.target.value)}
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
          <label
            htmlFor="repassword"
            className="block text-sm font-medium text-gray-900"
          >
            Parolni tasdiqlang
          </label>
          <input
            id="repassword"
            name="repassword"
            type="password"
            required
            autoComplete="new-password"
            onChange={(e) => {
              setRepwd(e.target.value);
              setError("");
            }}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <button
            onClick={handleRegisterClick}
            className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ro'yhatdan o'tish
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Hisobingiz bormi?{" "}
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
