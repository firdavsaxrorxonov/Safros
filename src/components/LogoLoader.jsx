import React from "react";
import logo from "../assets/logo.png";

function LogoLoader({ loaded, onLoad }) {
  return (
    <div className="flex justify-center">
      {!loaded && (
        <div className="w-28 h-28 bg-gray-200 rounded animate-pulse" />
      )}
      <img
        alt="Your Company"
        src={logo}
        onLoad={onLoad}
        className={`w-28 mx-auto transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute"
          }`}
      />
    </div>
  );
}

export default LogoLoader;
