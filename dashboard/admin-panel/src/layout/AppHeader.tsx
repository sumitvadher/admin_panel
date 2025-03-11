"use client";
import { useTheme } from "@/context/ThemeContext";

const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between fixed top-0 left-0 right-0 z-50">
      <h1 className="text-lg font-bold">Admin Panel</h1>
      <button onClick={toggleTheme} className="bg-gray-700 px-3 py-1 rounded">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default AppHeader;

