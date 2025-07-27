import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const THEME_KEY = "selectedTheme"; // clave para localStorage
const DEFAULT_THEME = "bridgeTheme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
      const storedTheme = localStorage.getItem(THEME_KEY);
      return storedTheme ? storedTheme : DEFAULT_THEME;
    });

  useEffect(() => {
      localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useTheme() {
  return useContext(ThemeContext);
}
