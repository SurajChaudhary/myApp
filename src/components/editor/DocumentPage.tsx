import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GenerateIcon from "@mui/icons-material/AutoFixHigh";
import ReviewIcon from "@mui/icons-material/RateReview";
import FroalaEditorComponent from "react-froala-wysiwyg";
import styles from "../../styles/editor/DocumentPage.module.css";

const DocumentPage: React.FC = () => {
  const [isVerticalSectionOpen, setIsVerticalSectionOpen] = useState(false);

  const toggleVerticalSection = () => {
    setIsVerticalSectionOpen(!isVerticalSectionOpen);
  };

  return (
    <Box className={styles.container}>
      {/* Document Details Section */}
      <Box className={styles.detailsSection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Document Details
        </Typography>
        <Box className={styles.detailsRow}>
          <Typography className={styles.label}>Category:</Typography>
          <Typography className={styles.value}>Financial</Typography>
        </Box>
        <Box className={styles.detailsRow}>
          <Typography className={styles.label}>Template:</Typography>
          <Typography className={styles.value}>Quarterly Audit</Typography>
        </Box>
        <Box className={styles.detailsRow}>
          <Typography className={styles.label}>Project Details:</Typography>
          <Typography className={styles.value}>Project Alpha</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Editor Section */}
      <Box className={styles.editorSection}>
        <Box className={styles.editorHeader}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Editor
          </Typography>
          <Box className={styles.actionButtons}>
            <IconButton
              color="primary"
              onClick={() => toggleVerticalSection()}
              aria-label="Generate"
            >
              <GenerateIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => toggleVerticalSection()}
              aria-label="Review"
            >
              <ReviewIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box className={styles.editorArea}>
          <FroalaEditorComponent
            config={{
              toolbarInline: false,
              toolbarButtons: [
                "bold",
                "italic",
                "underline",
                "formatOL",
                "formatUL",
                "insertLink",
                "undo",
                "redo",
              ],
              toolbarSticky: true,
              heightMin: 600, // Froala minimum height
              theme: "gray", // Compact styling
            }}
          />
        </Box>
      </Box>

      {/* Vertical Section */}
      {isVerticalSectionOpen && (
        <Box className={styles.verticalSection}>
          <Box className={styles.verticalHeader}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Vertical Section
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => toggleVerticalSection()}
              aria-label="Close Vertical Section"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          {/* Vertical section content */}
          <Typography variant="body2" className={styles.verticalContent}>
            Here you can add Generate or Review content.
          </Typography>
        </Box>
      )}

      {/* Vertical Ribbon */}
      <Box className={styles.ribbon}>
        <IconButton
          color="primary"
          onClick={() => toggleVerticalSection()}
          className={styles.ribbonButton}
        >
          <GenerateIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => toggleVerticalSection()}
          className={styles.ribbonButton}
        >
          <ReviewIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DocumentPage;
