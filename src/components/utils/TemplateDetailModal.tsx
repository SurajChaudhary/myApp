import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../../styles/modals/TemplateDetailModal.module.css";

interface TemplateDetailModalProps {
  open: boolean;
  onClose: () => void;
  template: {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
    templateId: number;
    templateName: string;
    templateTitle: string;
    templateSubtitle: string;
    templateDescription: string;
    templateType: string;
    templateFields: Array<{
      id: number;
      label: string;
      name: string;
      type: string;
    }>;
  } | null;
}

const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({ open, onClose, template }) => {
  if (!template) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Template Details</DialogTitle>
      <DialogContent dividers>
        <div className={styles.content}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Category ID:</strong> {template.categoryId}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Category Name:</strong> {template.categoryName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Category Description:</strong> {template.categoryDescription}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Template ID:</strong> {template.templateId}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Template Name:</strong> {template.templateName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Template Title:</strong> {template.templateTitle}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Template Subtitle:</strong> {template.templateSubtitle}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {template.templateDescription}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Template Type:</strong> {template.templateType}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Fields:</strong>
          </Typography>
          <ul className={styles.fieldsList}>
            {template.templateFields.map((field) => (
              <li key={field.id}>
                {field.label} ({field.name} - {field.type})
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateDetailModal;