import React from "react";

function SubmitButton({ onClick, loading, text }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading
          ? "bg-indigo-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-500"
        }`}
    >
      {loading ? "Yuklanmoqda..." : text}
    </button>
  );
}

export default SubmitButton;
