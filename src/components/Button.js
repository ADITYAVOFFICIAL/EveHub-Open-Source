import React from "react";

const Button = ({ text, type, cb, loading, style }) => {
  return (
      <button
        type={type}
        disabled={loading}
        className={`p-4 text-white text-center  text-lg rounded-[18px] bg-gray-800 font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ${style || 'my-8'}`}
        onClick={cb}
      >
        { loading ? "We'll take it from here..." : text}
      </button>
  );
};

export default Button;
