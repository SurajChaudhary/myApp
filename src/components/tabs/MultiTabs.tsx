import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "../../styles/tabs/MultiTabs.module.css";
import CreateTemplateTab from "./CreateTemplateTab";
import TemplateListingTab from "./TemplateListingTab";
import UploadTemplateTab from "./UploadTemplateTab";
import AuditorCopilotTab from "../copilot/AuditorCopilotTab";
import canonicalData from "../../data/canonicalData.json";

interface MultiTabsProps {
  searchText: string;
}

const MultiTabs: React.FC<MultiTabsProps> = ({ searchText }) => {
  const [activeTab, setActiveTab] = useState(0);
  const auditUniverses = canonicalData.auditUniverses || [];
  const firstAuditUniverse = auditUniverses[0] || {};

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Define initialContext
  const initialContext = {
    currentContext: JSON.stringify(firstAuditUniverse, null, 2),
    relatedContext: JSON.stringify(
      firstAuditUniverse?.projects?.[0]?.relatedProjects || [],
      null,
      2
    ),
  };

  // Define apiDetails
  const apiDetails = {
    endpoint: "https://api.gptmodel.com/generate",
    apiKey: "your-api-key-here",
  };

  // Define models
  const models = ["GPT-4", "GPT-3.5", "Custom Model"];

  return (
    <Box className={styles.multiTabs}>
      <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Templates" />
        <Tab label="My Templates" />
        <Tab label="Upload Template" />
        <Tab label="Auditor Copilot" />
      </Tabs>
      <div className={styles.tabContent}>
        {activeTab === 0 && <CreateTemplateTab searchText={searchText} />}
        {activeTab === 1 && <TemplateListingTab />}
        {activeTab === 2 && <UploadTemplateTab />}
        {activeTab === 3 && <AuditorCopilotTab
            initialContext={initialContext}
            apiDetails={apiDetails}
            initialTheme="light"
            models={models}
          />}
      </div>
    </Box>
  );
};

export default MultiTabs;
