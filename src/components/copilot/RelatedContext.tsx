import React from "react";
import { Box, Typography, TextField, Chip, IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styles from "../../styles/copilot/RelatedContext.module.css";

interface RelatedContextProps {
  initialContext: {
    relatedData: string[]; // Represents initial related context data
  };
  theme: "light" | "dark";
  onRegenerate: () => void; // Callback for auto-regenerate functionality
}

const RelatedContext: React.FC<RelatedContextProps> = ({ initialContext, theme, onRegenerate }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tags, setTags] = React.useState<string[]>(initialContext.relatedData || []);

  // Handle adding a new tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setTags((prevTags) => [...prevTags, searchQuery.trim()]);
      setSearchQuery("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <Box
      className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}
    >
      {/* Title Row */}
      <Typography variant="h6" className={styles.title}>
        Related Context
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleAddTag}
        className={styles.searchBar}
      />

      {/* Tags Section */}
      <Box className={styles.tagsSection}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            className={styles.tag}
            color="primary"
          />
        ))}
      </Box>

      {/* Footer Row */}
      <Box className={styles.footer}>
        <Typography variant="body2" className={styles.footnotes}>
          * Auto-generated related context.
        </Typography>
        <IconButton
          onClick={onRegenerate}
          aria-label="Auto Regenerate"
          className={styles.regenerateButton}
        >
          <AutorenewIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RelatedContext;
