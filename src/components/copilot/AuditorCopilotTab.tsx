import React, { useState } from "react";
import TopSection from "./TopSection";
import ChatTabs from "./ChatTabs";
import styles from "../../styles/copilot/AuditorCopilotTab.module.css";

interface AuditorCopilotTabProps {
  initialContext: {
    currentContext: string;
    relatedContext: string;
  };
  apiDetails: {
    endpoint: string;
    apiKey: string;
  };
  initialTheme: "light" | "dark";
  models: string[];
}

const AuditorCopilotTab: React.FC<AuditorCopilotTabProps> = ({
  initialContext,
  apiDetails,
  initialTheme,
  models,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const [tabs, setTabs] = useState([{ id: "tab1", title: "Chat 1" }]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [tabData, setTabData] = useState<Record<string, {
    currentContext: string;
    relatedContext: string;
    chatMessages: any[];
    latestResponse: string;
  }>>({
    tab1: {
      currentContext: initialContext.currentContext,
      relatedContext: initialContext.relatedContext,
      chatMessages: [],
      latestResponse: "",
    },
  });

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const handleTabChange = (tabId: string) => setActiveTab(tabId);

  const handleTabAdd = () => {
    const newTabId = `tab${tabs.length + 1}`;
    setTabs([...tabs, { id: newTabId, title: `Chat ${tabs.length + 1}` }]);
    setTabData({
      ...tabData,
      [newTabId]: {
        currentContext: "New Current Context",
        relatedContext: "New Related Context",
        chatMessages: [],
        latestResponse: "",
      },
    });
    setActiveTab(newTabId);
  };

  const handleTabClose = (tabId: string) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    setActiveTab(updatedTabs[0]?.id || "");
    const { [tabId]: _, ...remainingTabData } = tabData;
    setTabData(remainingTabData);
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}>
  <TopSection
    title="Auditor Copilot"
    theme={theme}
    onThemeChange={handleThemeChange}
  />
  <div className={styles.divider}></div> {/* Divider always visible */}
  <ChatTabs
    tabs={tabs}
    activeTab={activeTab}
    theme={theme}
    onTabChange={handleTabChange}
    onTabAdd={handleTabAdd}
    onTabClose={handleTabClose}
    tabData={tabData}
    apiDetails={apiDetails}
  />
</div>
  );
};

export default AuditorCopilotTab;
