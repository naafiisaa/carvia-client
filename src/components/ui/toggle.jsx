import React, { useState } from "react";

export const Toggle = ({ onToggle, initial = false, className = "" }) => {
  const [toggled, setToggled] = useState(initial);

  const handleToggle = () => {
    setToggled((prev) => !prev);
    if (onToggle) onToggle(!toggled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded ${toggled ? "bg-green-600 text-white" : "bg-gray-300"} ${className}`}
    >
      {toggled ? "On" : "Off"}
    </button>
  );
};
