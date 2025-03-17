import React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import styles from "../../styles/copilot/TopSection.module.css";

interface TopSectionProps {
  title: string;
  theme: "light" | "dark";
  onThemeChange: (newTheme: "light" | "dark") => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  title,
  theme,
  onThemeChange,
}) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <IconButton
  onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
  className={styles.themeButton}
  aria-label="Toggle theme"
>
  {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>
  </div>
);

export default TopSection;
