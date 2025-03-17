import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../../styles/footer/Footer.module.css";

const Footer: React.FC = () => (
  <Box component="footer" className={styles.footer}>
    <Typography variant="caption" className={styles.text}>
      © 2025 My Company
    </Typography>
  </Box>
);

export default Footer;
