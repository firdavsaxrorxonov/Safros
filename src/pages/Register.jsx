import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import LogoLoader from "../components/LogoLoader";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";

function Register() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [repwd, setRepwd] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;

  async function handleRegisterClick(e) {
    e.preventDefault();

    if (username.trim().length < 3) {
      setError("Login kamida 3 ta belgidan iborat bo‘lishi kerak.");
      return;
    }
    if (!passwordRegex.test(pwd)) {
      setError(
        "Parol kamida 8 ta belgidan iborat bo‘lishi va 1 ta harf hamda 1 ta raqam o‘z ichiga olishi kerak."
      );
      return;
    }
    if (pwd !== repwd) {
      setError("Parollar bir xil emas.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://safros.up.railway.app/api/v1/registration/",
        {
          username: username.trim(),
          password1: pwd.trim(),
          password2: pwd.trim(),
        }
      );
      Cookies.set("Token", response.data.key);
      localStorage.setItem(
        "safros-userdata",
        JSON.stringify({ username: username.trim() })
      );
      navigate("/qarzlar");
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data?.username) {
        setError(err.response.data.username[0]);
      } else if (err.response?.data?.password1) {
        setError(err.response.data.password1[0]);
      } else {
        setError("Ro'yxatdan o'tishda xatolik yuz berdi. Qayta urinib ko‘ring.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col justify-start pt-14 px-4 overflow-y-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoLoader loaded={logoLoaded} onLoad={() => setLogoLoaded(true)} />
        <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-gray-900">
          Ro'yhatdan o'tish
        </h2>
        <ErrorMessage message={error} />
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
        <InputField
          label="Login"
          id="login"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        <InputField
          label="Parol"
          id="password"
          type="password"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setError("");
          }}
        />
        <InputField
          label="Parolni tasdiqlang"
          id="repassword"
          type="password"
          value={repwd}
          onChange={(e) => {
            setRepwd(e.target.value);
            setError("");
          }}
        />
        <SubmitButton
          onClick={handleRegisterClick}
          loading={loading}
          text="Ro'yhatdan o'tish"
        />

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
