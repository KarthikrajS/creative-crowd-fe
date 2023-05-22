import React from "react";
import { ThemeContext, useTheme } from "../context/ThemeContext";

import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";

const Toggle = () => {
  const { theme, setTheme } = useTheme();

  function isDark() {
    return theme === "dark";
  }

  return (
    <div className="px-3 flex">
      <DarkModeToggle
        mode={theme}
        size="sm"
        inactiveTrackColor="#e2e8f0"
        inactiveTrackColorOnHover="#f8fafc"
        inactiveTrackColorOnActive="#cbd5e1"
        activeTrackColor="#334155"
        activeTrackColorOnHover="#1e293b"
        activeTrackColorOnActive="#0f172a"
        inactiveThumbColor="#1e293b"
        activeThumbColor="#F9C909"
  
        onChange={(mode) => {
          setTheme(mode);
        }}
      />
    </div>
  );
};

export default Toggle;
