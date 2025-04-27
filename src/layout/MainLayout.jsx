import React from "react";
import Header from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function MainLayout() {
  const token = Cookies.get("Token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="pb-20">
        <Outlet /> {/* Bu joyga nested route componentlari chiqadi */}
      </div>
      <Header />
    </>
  );
}

export default MainLayout;
