import React from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import styles from "../../styles/copilot/LatestResponse.module.css";

interface LatestResponseProps {
  lastResponse: string; // Latest response from LLM
  theme: "light" | "dark";
  onCopy: () => void; // Function to copy text
}

const LatestResponse: React.FC<LatestResponseProps> = ({ lastResponse, theme, onCopy }) => {
  // Do not render the component if there is no response
  if (!lastResponse) return null;

  return (
    <Box
      className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}
    >
      {/* Title Row */}
      <Typography variant="h6" className={styles.title}>
        Latest Response
      </Typography>

      {/* Response Area */}
      <Paper elevation={1} className={styles.responseArea}>
        <Typography variant="body1" className={styles.responseText}>
          {lastResponse}
        </Typography>
      </Paper>

      {/* Footer Row */}
      <Box className={styles.footer}>
        <Typography variant="body2" className={styles.footnotes}>
          * Responses are auto-generated.
        </Typography>
        <IconButton
          onClick={onCopy}
          aria-label="Copy Response"
          className={styles.copyButton}
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default LatestResponse;
