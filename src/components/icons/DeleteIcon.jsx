import React from "react";

export default function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="yellow"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="w-8 h-8 text-white p-2 bg-red-400 rounded-full cursor-pointer"
      viewBox="0 0 24 24"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M17,6a2,2 0 0,1 2,2v10a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2v-10a2,2 0 0,1 2,-2h2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
}
