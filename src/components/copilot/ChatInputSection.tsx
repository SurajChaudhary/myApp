import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../../styles/copilot/ChatInputSection.module.css";

interface ChatInputSectionProps {
  theme: "light" | "dark";
  models: string[];
  onSend: (prompt: string, model: string) => void; // Callback to send user input
}

const ChatInputSection: React.FC<ChatInputSectionProps> = ({ theme, models, onSend }) => {
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const handleSend = () => {
    if (inputText.trim() === "") return; // Prevent sending empty messages
    onSend(inputText, selectedModel);
    setInputText(""); // Clear the input field after sending
  };

  return (
    <Box
      className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}
    >
      {/* Title Row */}
      <Box className={styles.titleRow}>
        <Typography variant="h6" className={styles.title}>
          Chat
        </Typography>
        <FormControl variant="outlined" size="small" className={styles.dropdown}>
          <InputLabel>Model</InputLabel>
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            label="Model"
          >
            {models.map((model, index) => (
              <MenuItem key={index} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />

      {/* Input Area */}
      <Box className={styles.inputArea}>
        <TextField
          multiline
          maxRows={8} // Adjust based on design
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          variant="outlined"
          fullWidth
          className={styles.inputField}
        />
        <IconButton
          onClick={handleSend}
          color="primary"
          className={styles.sendButton}
          aria-label="Send Message"
        >
          <SendIcon />
        </IconButton>
      </Box>

      {/* Footer Row */}
      <Typography variant="body2" className={styles.footnotes}>
        * Please use proper formatting for prompts.
      </Typography>
    </Box>
  );
};

export default ChatInputSection;
