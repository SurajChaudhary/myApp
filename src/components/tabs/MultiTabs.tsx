import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateTemplateTab from "../tabs/CreateTemplateTab";
import TemplateListingTab from "../tabs/TemplateListingTab";
import UploadTemplateTab from "../tabs/UploadTemplateTab";
import AuditorCopilotTab from "../tabs/AuditorCopilotTab";
import "../../styles/tabs/MultiTabs.module.css";
import canonicalData from "../../data/canonicalData.json";

interface MultiTabsProps {
  searchText: string;
}

const MultiTabs: React.FC<MultiTabsProps> = ({ searchText }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const currentContext = canonicalData;
  const relatedContext = canonicalData.auditUniverses.map(
    (universe: { id: number; name: string }) => ({
      id: universe.id.toString(),
      name: universe.name,
    })
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
        <Tab label="Templates" />
        <Tab label="My Templates" />
        <Tab label="Upload Template" />
        <Tab label="Auditor Copilot" />
      </Tabs>
      <Box sx={{ marginTop: "20px" }}>
        {activeTab === 0 && <CreateTemplateTab searchText={searchText} />}
        {activeTab === 1 && <TemplateListingTab />}
        {activeTab === 2 && <UploadTemplateTab />}
        {activeTab === 3 && (
          <AuditorCopilotTab
            initialTheme="dark"
            currentContext={currentContext}
            relatedContext={relatedContext}
            apiDetails={
              {
                /* your API config here */
              }
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default MultiTabs;
