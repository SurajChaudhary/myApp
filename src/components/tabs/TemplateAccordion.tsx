import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import styles from "../../styles/tabs/TemplateAccordion.module.css";

interface TemplateField {
  id: number;
  label: string;
  name: string;
  type: string;
}

interface Document {
  templateId: number;
  templateName: string;
  templateDescription: string;
  templateModalFields: TemplateField[];
}

interface Category {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  documents: Document[];
}

interface TemplateAccordionProps {
  category: Category;
  expanded: boolean;
  onChange: () => void;
  onTemplateClick: (template: Document) => void; // Explicitly type the argument
}

const TemplateAccordion: React.FC<TemplateAccordionProps> = ({
  category,
  expanded,
  onChange,
  onTemplateClick,
}) => (
  <Accordion expanded={expanded} onChange={onChange} className={styles.accordion}>
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}  className={styles.accordionSummary}>
      <Typography variant="h6" className={styles.accordionTitle}>
        {category.categoryName}
      </Typography>
    </AccordionSummary>
    <AccordionDetails className={styles.accordionDetails}>
      <List className={styles.templateList}>
        {category.documents.map((doc) => (
          <ListItem
            key={doc.templateId}
            component="button" /* Explicitly set component as a button */
            onClick={() => onTemplateClick(doc)}
            className={styles.listItem}
          >
            <ListItemIcon>
              <FolderIcon className={styles.listItemIcon} />
            </ListItemIcon>
            <ListItemText
              primary={doc.templateName}
              secondary={doc.templateDescription}
              classes={{
                primary: styles.listItemTextPrimary,
                secondary: styles.listItemTextSecondary,
              }}
            />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);

export default TemplateAccordion;
