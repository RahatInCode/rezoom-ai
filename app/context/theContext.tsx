"use client";

import { createContext } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}

const TheContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export default TheContext;
