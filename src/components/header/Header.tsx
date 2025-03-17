import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "../../styles/header/Header.module.css";

const Header: React.FC = () => (
  <AppBar position="relative" className={styles.header}>
    <Toolbar>
      <Typography variant="h6" className={styles.title}>
        My Web Application
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
