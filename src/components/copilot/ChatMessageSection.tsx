import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import styles from "../../styles/copilot/ChatMessageSection.module.css";

interface Message {
  sender: "user" | "llm";
  content: string;
  timestamp: string;
}

interface ChatMessageSectionProps {
  initialContext: any; // Placeholder for contextual props
  theme: "light" | "dark";
  messages: Message[];
}

const ChatMessageSection: React.FC<ChatMessageSectionProps> = ({
  initialContext,
  theme,
  messages,
}) => {
  return (
    <Box
      className={`${styles.container} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      {/* Title Row */}
      <Typography variant="h6" className={styles.title}>
        Messages
      </Typography>
      <Divider />

      {/* Message Area */}
      <Box className={styles.messageArea}>
        {messages.map((message, index) => (
          <Paper
            key={index}
            className={`${styles.message} ${
              message.sender === "user" ? styles.userMessage : styles.llmMessage
            }`}
          >
            <Box className={styles.messageHeader}>
              <Typography variant="caption" className={styles.sender}>
                {message.sender === "user" ? "User ID" : "GPT-4"}
              </Typography>
              <Typography variant="caption" className={styles.timestamp}>
                {message.timestamp}
              </Typography>
            </Box>
            <Typography variant="body2" className={styles.content}>
              {message.content}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Footnotes Row */}
      <Typography variant="body2" className={styles.footnotes}>
        * Messages are logged for review.
      </Typography>
    </Box>
  );
};

export default ChatMessageSection;
