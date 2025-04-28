import React from "react";

function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="text-center mt-1 text-red-600">{message}</p>;
}

export default ErrorMessage;
