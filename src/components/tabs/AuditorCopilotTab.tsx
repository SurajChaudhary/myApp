import React, { useState } from "react";
import styles from "../../styles/tabs/AuditorCopilotTab.module.css";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SendIcon from "@mui/icons-material/Send";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CurrentContextSelector from "./CurrentContextSelector";

// Type definitions for props
interface ChatMessage {
  id: string;
  sender: "user" | "llm";
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  latestResponse?: string;
}

export interface AuditorCopilotProps {
  initialTheme?: "light" | "dark";
  currentContext: any;
  relatedContext: Array<{ id: string; name: string }>;
  apiDetails?: any;
}

const AuditorCopilotTab: React.FC<AuditorCopilotProps> = ({
  initialTheme = "dark",
  currentContext,
  relatedContext = [], // Default empty array if no relatedContext is provided
  apiDetails,
}) => {
  // State: theme, chat, message input, related context
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const [chatSessions, setChatSessions] = useState<Chat[]>([
    { id: "chat-1", title: "New Chat", messages: [] },
  ]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [relatedSearch, setRelatedSearch] = useState("");
  const [selectedRelatedTags, setSelectedRelatedTags] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedGPTModel, setSelectedGPTModel] = useState("gpt-3.5-turbo"); // State for GPT model dropdown

  /* ----------------------- THEME HANDLER ----------------------- */
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  /* ----------------------- CHAT MANAGEMENT ----------------------- */
  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`, // Ensure unique ID using timestamp
      title: "New Chat",
      messages: [],
    };
    setChatSessions([...chatSessions, newChat]);
    setActiveChatIndex(chatSessions.length); // Focus on the newly added tab
  };

  const handleCloseChat = (index: number) => {
    if (chatSessions.length <= 1) return; // Ensure there is always at least one tab
  
    const updatedChats = chatSessions.filter((_, i) => i !== index);
    setChatSessions(updatedChats);
  
    // Adjust the active tab if the current one is closed
    if (activeChatIndex === index) {
      setActiveChatIndex(index === 0 ? 0 : index - 1); // Shift to the next available tab
    } else if (activeChatIndex > index) {
      setActiveChatIndex(activeChatIndex - 1); // Adjust active index when preceding tabs are closed
    }
  };
  

  /* ----------------------- MESSAGE HANDLER ----------------*/
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString();
    const currentChat = { ...chatSessions[activeChatIndex] };

    // Create user and LLM messages
    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      sender: "user",
      content: messageInput,
      timestamp,
    };

    const llmResponse: ChatMessage = {
      id: `${Date.now()}-llm`,
      sender: "llm",
      content: `LLM Response to: "${messageInput}"`, // Simulated response
      timestamp,
    };

    // Update chat messages and title
    const updatedMessages = [...currentChat.messages, userMessage, llmResponse];
    currentChat.messages = updatedMessages;
    currentChat.latestResponse = llmResponse.content;
    if (currentChat.messages.length === 2) {
      currentChat.title = messageInput.split(" ").slice(0, 3).join(" ");
    }

    const updatedChats = [...chatSessions];
    updatedChats[activeChatIndex] = currentChat;
    setChatSessions(updatedChats);
    setMessageInput(""); // Clear input
  };
  /* ----------------------- COPY LATEST RESPONSE ----------------------- */
  const handleCopyLatestResponse = () => {
    const latestResponse = chatSessions[activeChatIndex]?.latestResponse;
    if (latestResponse) {
      alert("Latest response copied to clipboard!");
    }
  };

  /* ----------------------- TAG MANAGEMENT ----------------------- */
  const handleRelatedSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRelatedSearch(e.target.value);
  };

  const handleAddTag = (tagName: string) => {
    if (selectedRelatedTags.some((tag) => tag.name === tagName)) return; // Avoid duplicate tags
    setSelectedRelatedTags([
      ...selectedRelatedTags,
      { id: `${Date.now()}`, name: tagName },
    ]);
    setRelatedSearch(""); // Clear search input after adding a tag
  };

  const handleRegenerate = () => {
    setRelatedSearch(""); // Clear search input
    setSelectedRelatedTags([]); // Clear all selected tags
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedRelatedTags((prevTags) =>
      prevTags.filter((tag) => tag.id !== tagId)
    );
  };

  // Filter related tags dynamically
  const filteredRelatedTags = relatedContext.filter(
    (tag) =>
      tag.name.toLowerCase().includes(relatedSearch.toLowerCase()) &&
      !selectedRelatedTags.some((selected) => selected.name === tag.name)
  );

  return (
    <div
      className={`${styles.container} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.centerTitle}>
          Auditor Assistant
          <hr className={styles.titleSeparator} />
        </div>
        <IconButton onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>

      {/* Chat Tabs */}
      <div className={styles.chatTabs}>
        {chatSessions.map((chat, index) => (
          <div
            key={chat.id}
            className={`${styles.chatTab} ${
              activeChatIndex === index ? styles.activeTab : ""
            }`}
          >
            {/* Tab title, clicking it sets the active chat */}
            <span onClick={() => setActiveChatIndex(index)}>{chat.title}</span>

            {/* Conditionally render "X" button for all tabs except the first one */}
            {index > 0 && (
              <IconButton
                className={styles.closeChatButton}
                onClick={() => handleCloseChat(index)}
              >
                &times;
              </IconButton>
            )}
          </div>
        ))}
        <div
          className={styles.chatTab}
          onClick={handleNewChat}
          title="New Chat"
        >
          <AddIcon className={styles.addIcon} />
        </div>
      </div>

      {/* Current Context */}
      <div className={styles.sectionGroup}>
        <div className={styles.sectionTitle}>Current Context</div>
        <div className={`${styles.sectionContainer} ${styles.currentContext}`}>
          <CurrentContextSelector data={currentContext} />
        </div>
      </div>

      {/* Related Context */}
      <div className={styles.sectionGroup}>
        <div className={styles.sectionTitle}>Related Context</div>
        <div className={`${styles.sectionContainer} ${styles.relatedContext}`}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search or add a related context"
            value={relatedSearch}
            onChange={handleRelatedSearchChange}
            className={styles.relatedSearchInput}
          />
          {/* Filtered Tags */}
          {relatedSearch && filteredRelatedTags.length > 0 && (
            <ul className={styles.relatedDropdown}>
              {filteredRelatedTags.map((tag) => (
                <li
                  key={tag.id}
                  className={styles.relatedDropdownItem}
                  onClick={() => {
                    handleAddTag(tag.name);
                    setRelatedSearch(""); // Clear search input after selection
                  }}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
          {/* Selected Tags */}
          <div className={styles.relatedTags}>
            {selectedRelatedTags.map((tag) => (
              <div key={tag.id} className={styles.relatedTag}>
                {tag.name}
                <span
                  className={styles.removeTag}
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Regenerate Button */}
        <div className={styles.regenerateButtonRow}>
          <IconButton
            onClick={handleRegenerate}
            className={styles.regenerateButton}
          >
            <AutorenewIcon />
          </IconButton>
        </div>
      </div>

      {/* Messages Section */}
      <div className={styles.sectionGroup}>
        <div className={styles.sectionTitle}>Messages</div>
        <div className={`${styles.sectionContainer} ${styles.messagesSection}`}>
          {chatSessions[activeChatIndex].messages.length === 0 ? (
            <div className={styles.noMessages}>No messages yet.</div>
          ) : (
            chatSessions[activeChatIndex].messages.map((msg) => (
              <div key={msg.id} className={styles.messageWrapper}>
                <div className={styles.messageHeader}>
                  <span className={styles.messageSender}>
                    {msg.sender === "user" ? "User" : "Assistant Response"}
                  </span>
                  <span className={styles.messageTimestamp}>
                    {msg.timestamp}
                  </span>
                </div>
                <div
                  className={`${styles.message} ${
                    msg.sender === "llm"
                      ? styles.llmMessage
                      : styles.userMessage
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Latest Response Section */}
      {chatSessions[activeChatIndex].latestResponse && (
        <div className={styles.sectionGroup}>
          <div className={styles.latestHeader}>
            <div className={styles.sectionTitle}>Latest Response</div>
            <div className={styles.responseActions}>
              <IconButton
                onClick={handleCopyLatestResponse}
                className={`${styles.iconButton} ${styles.actionButton}`}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <div
            className={`${styles.sectionContainer} ${styles.latestResponse}`}
          >
            <div>{chatSessions[activeChatIndex].latestResponse}</div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className={styles.sectionGroup}>
        <div className={styles.chatHeader}>
          <div className={styles.sectionTitle}>Chat</div>
          <select
            className={styles.gptModelSelect}
            value={selectedGPTModel}
            onChange={(e) => setSelectedGPTModel(e.target.value)}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="custom">Custom Model</option>
          </select>
        </div>
        <div className={`${styles.sectionContainer} ${styles.chatWindow}`}>
          <input
            type="text"
            placeholder="Type your message here"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className={styles.chatInput}
          />
          <IconButton
            className={`${styles.iconButton} ${styles.sendButton}`}
            onClick={handleSendMessage}
            disabled={!messageInput.trim()} // Disable if input is empty
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AuditorCopilotTab;
