import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TemplateAccordion from "./TemplateAccordion";
import TemplateDetailModal from "../utils/TemplateDetailModal";
import fallbackData from "../../data/templates.json";
import styles from "../../styles/tabs/CreateTemplateTab.module.css";

import { TemplateField, Document, Category } from "../utils/sharedTypes";

interface SelectedTemplate extends Document {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

interface ApiResponse {
  templates: Category[];
}

interface CreateTemplateTabProps {
  searchText: string;
}

const CreateTemplateTab: React.FC<CreateTemplateTabProps> = ({ searchText }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<SelectedTemplate | null>(null);

  // Fetch templates data from API
  useEffect(() => {
    fetch("/api/v1/templates")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch templates");
        return response.json();
      })
      .then((jsonData: ApiResponse) => setData(jsonData))
      .catch(() => setData(fallbackData as ApiResponse))
      .finally(() => setLoading(false));
  }, []);

  // Handle accordion state
  const handleAccordionChange = (id: number) => {
    setExpandedAccordion((prev) => (prev === id ? null : id));
  };

  // Handle template click
  const handleTemplateClick = (category: Category, template: Document) => {
    setSelectedTemplate({
      ...template,
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
    });
    setDialogOpen(true);
  };

  // Apply search filter to expand matching accordions
  const searchLower = searchText.toLowerCase();
  const filteredCategories =
    data?.templates.filter((category) =>
      category.documents.some((doc) => doc.templateName.toLowerCase().includes(searchLower))
    ) || [];

  if (loading) {
    return (
      <div className={styles.center}>
        <CircularProgress />
      </div>
    );
  }

  if (!data || data.templates.length === 0) {
    return <Typography>No templates available</Typography>;
  }

  return (
    <div className={styles.container}>
      {filteredCategories.map((category) => (
  <TemplateAccordion
    key={category.categoryId}
    category={category}
    expanded={expandedAccordion === category.categoryId}
    onTemplateClick={(template) => handleTemplateClick(category, template as Document)} // Explicitly cast as Document
    onChange={() => handleAccordionChange(category.categoryId)}
  />
))}


      {selectedTemplate && (
        <TemplateDetailModal
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onNext={(data) => {
            console.log("Next button clicked with data:", data);
          }}
          template={selectedTemplate}
        />
      )}
    </div>
  );
};

export default CreateTemplateTab;
