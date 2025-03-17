import React from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "../../styles/copilot/CurrentContext.module.css";

interface CurrentContextProps {
  initialContext: {
    auditUniverseName: string;
    dropdownData: {
      projectNames: string[];
      sectionNames: string[];
      sectionCodes: string[];
      sectionDescriptions: string[];
      workPaperNames: string[];
    };
  };
  theme: "light" | "dark";
}

const CurrentContext: React.FC<CurrentContextProps> = ({ initialContext, theme }) => {
  const { auditUniverseName, dropdownData = { // Default fallback
    projectNames: [],
    sectionNames: [],
    sectionCodes: [],
    sectionDescriptions: [],
    workPaperNames: []
  }} = initialContext;

  // Dropdown state handlers
  const [projectName, setProjectName] = React.useState("");
  const [sectionName, setSectionName] = React.useState("");
  const [sectionCode, setSectionCode] = React.useState("");
  const [sectionDescription, setSectionDescription] = React.useState("");
  const [workPaperName, setWorkPaperName] = React.useState("");

  return (
    <Box
      className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}
    >
      {/* Title Row */}
      <Typography variant="h6" className={styles.title}>
        Current Context: {auditUniverseName}
      </Typography>

      {/* Dropdown Section */}
      <Box className={styles.dropdownSection}>
        {/* Project Name Dropdown */}
        <FormControl fullWidth className={styles.dropdown}>
          <InputLabel>Project Name</InputLabel>
          <Select
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          >
            {dropdownData.projectNames.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Section Name Dropdown */}
        <FormControl fullWidth className={styles.dropdown}>
          <InputLabel>Section Name</InputLabel>
          <Select
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          >
            {dropdownData.sectionNames.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Section Code Dropdown */}
        <FormControl fullWidth className={styles.dropdown}>
          <InputLabel>Section Code</InputLabel>
          <Select
            value={sectionCode}
            onChange={(e) => setSectionCode(e.target.value)}
          >
            {dropdownData.sectionCodes.map((code, index) => (
              <MenuItem key={index} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Section Description Dropdown */}
        <FormControl fullWidth className={styles.dropdown}>
          <InputLabel>Section Description</InputLabel>
          <Select
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
          >
            {dropdownData.sectionDescriptions.map((desc, index) => (
              <MenuItem key={index} value={desc}>
                {desc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Work Paper Name Dropdown */}
        <FormControl fullWidth className={styles.dropdown}>
          <InputLabel>Work Paper Name</InputLabel>
          <Select
            value={workPaperName}
            onChange={(e) => setWorkPaperName(e.target.value)}
          >
            {dropdownData.workPaperNames.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Footnotes Row */}
      <Typography variant="body2" className={styles.footnotes}>
        * These details are from the canonical data source.
      </Typography>
    </Box>
  );
};

export default CurrentContext;
