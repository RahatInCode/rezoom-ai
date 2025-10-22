"use client";

import React, { ReactNode } from "react";
import TheContext from "./theContext";
import useLocalStorage from "../hook/useLocalStorage";


interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<string>("theme", "light");

  return (
    <TheContext.Provider value={{ theme, setTheme }}>
      {children}
    </TheContext.Provider>
  );
};

export default ThemeProvider;
