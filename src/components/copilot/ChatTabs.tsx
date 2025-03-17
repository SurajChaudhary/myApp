import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ChatTabContent from "./ChatTabContent";
import styles from "../../styles/copilot/ChatTabs.module.css";

interface ChatTab {
  id: string;
  title: string;
}

interface ChatTabsProps {
  tabs: ChatTab[];
  activeTab: string;
  theme: "light" | "dark";
  onTabChange: (tabId: string) => void;
  onTabAdd: () => void;
  onTabClose: (tabId: string) => void;
  tabData: Record<string, any>;
  apiDetails: {
    endpoint: string;
    apiKey: string;
  };
}

const ChatTabs: React.FC<ChatTabsProps> = ({
  tabs,
  activeTab,
  theme,
  onTabChange,
  onTabAdd,
  onTabClose,
  tabData,
  apiDetails,
}) => (
  <div className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}>
    <Tabs
      value={activeTab}
      onChange={(e, tabId) => onTabChange(tabId)}
      variant="scrollable"
      scrollButtons="auto"
      className={styles.tabs}
    >
      {tabs.map((tab, index) => (
        <div key={tab.id} className={styles.tabWrapper}>
          <Tab
            label={tab.title}
            value={tab.id}
            className={styles.tab}
          />
          {tabs.length > 1 && (
            <IconButton
              size="small"
              onClick={() => onTabClose(tab.id)}
              className={styles.closeButton}
              aria-label={`Close ${tab.title}`}
            >
              <CloseIcon fontSize="small" /> {/* Smaller close icon */}
            </IconButton>
          )}
          {index === tabs.length - 1 && (
            <IconButton
              size="small"
              onClick={onTabAdd}
              className={styles.addButton}
              aria-label="Add new tab"
            >
              <AddIcon fontSize="small" /> {/* Smaller add icon */}
            </IconButton>
          )}
        </div>
      ))}
    </Tabs>
    <div className={styles.content}>
      <ChatTabContent
        data={tabData[activeTab]}
        theme={theme}
        apiDetails={apiDetails}
      />
    </div>
  </div>
);

export default ChatTabs;
