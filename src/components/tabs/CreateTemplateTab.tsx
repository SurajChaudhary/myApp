import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styles from "../../styles/tabs/CreateTemplateTab.module.css";

// Import fallback data (assumed to be located at src/data/templates.json)
import fallbackData from "../../data/templates.json";

interface TemplateField {
  id: number;
  label: string;
  name: string;
  type: string;
}

interface Document {
  templateId: number;
  templateName: string;
  templateTitle: string;
  templateSubtitle: string;
  templateDescription: string;
  templateType: string;
  templateModalFields: TemplateField[];
}

interface Category {
  categoryId: number;
  categoryName: string;
  categoryTitle: string;
  categorySubtitle: string;
  categoryDescription: string;
  documents: Document[];
}

interface ApiResponse {
  templates: Category[];
}

interface SelectedTemplate {
  category: Category;
  document: Document;
}

interface CreateTemplateTabProps {
  searchText: string;
}

const CreateTemplateTab: React.FC<CreateTemplateTabProps> = ({
  searchText,
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<SelectedTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/templates")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API response was not ok");
        }
        return response.json();
      })
      .then((jsonData: ApiResponse) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("API call failed, using fallback data:", error);
        setData(fallbackData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Function to handle manual accordion toggling only when no search is active.
  const handleAccordionChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null);
    };

  // When a template link is clicked, open the modal with its details.
  const handleTemplateClick = (category: Category, document: Document) => {
    setSelectedTemplate({ category, document });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTemplate(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!data || !data.templates) {
    return <div>No templates data available.</div>;
  }

  const searchLower = searchText.trim().toLowerCase();

  // If search text is provided, filter out any category that has no matching documents.
  const categoriesToRender = searchLower
    ? data.templates.filter((category) =>
        category.documents.some(
          (doc) =>
            doc.templateName.toLowerCase().includes(searchLower) ||
            doc.templateTitle.toLowerCase().includes(searchLower)
        )
      )
    : data.templates;

  return (
    <div>
      {categoriesToRender.map((category) => {
        // For each category, if search text is present then filter its documents.
        const filteredDocuments = searchLower
          ? category.documents.filter(
              (doc) =>
                doc.templateName.toLowerCase().includes(searchLower) ||
                doc.templateTitle.toLowerCase().includes(searchLower)
            )
          : category.documents;

        return (
          <Accordion
            key={category.categoryId}
            expanded={searchLower ? true : expanded === category.categoryId}
            onChange={
              searchLower
                ? undefined
                : handleAccordionChange(category.categoryId)
            }
            className={styles.accordion} /* Add modern styling to accordion */
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/* Category Title */}
              <Typography variant="h6" className={styles.categoryTitle}>
                {category.categoryTitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Check if documents exist */}
              {filteredDocuments.length > 0 ? (
                <div className={styles.templatesContainer}>
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.templateId}
                      className={styles.templateItem}
                      onClick={() => handleTemplateClick(category, doc)}
                    >
                      {doc.templateName}
                    </div>
                  ))}
                </div>
              ) : (
                <Typography variant="body2">
                  No matching templates found.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* Modal displaying selected template details */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Template Details</DialogTitle>
        <DialogContent dividers>
          {selectedTemplate && (
            <div>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Category ID:</strong>{" "}
                {selectedTemplate.category.categoryId}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Category Name:</strong>{" "}
                {selectedTemplate.category.categoryName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Category Description:</strong>{" "}
                {selectedTemplate.category.categoryDescription}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Template ID:</strong>{" "}
                {selectedTemplate.document.templateId}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Template Name:</strong>{" "}
                {selectedTemplate.document.templateName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Template Title:</strong>{" "}
                {selectedTemplate.document.templateTitle}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Template Subtitle:</strong>{" "}
                {selectedTemplate.document.templateSubtitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong>{" "}
                {selectedTemplate.document.templateDescription}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Template Type:</strong>{" "}
                {selectedTemplate.document.templateType}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Fields:</strong>
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {selectedTemplate.document.templateModalFields.map((field) => (
                  <li key={field.id}>
                    {field.label} ({field.name} - {field.type})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTemplateTab;
