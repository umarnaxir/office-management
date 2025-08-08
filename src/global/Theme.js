import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDarkMode(saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const value = { isDarkMode, setIsDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
