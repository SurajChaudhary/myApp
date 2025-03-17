import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import styles from "../../styles/utils/TemplateDetailModal.module.css";

interface Resource {
  id: string;
  name: string;
  kerberos: string;
}

interface ProductResponse {
  productId: string;
  productCode: string;
  productName: string;
  resourcesStaffed: Resource[];
}

interface TemplateDetailModalProps {
  open: boolean;
  onClose: () => void;
  onNext: (data: { productCode: string; productName: string; resources: Resource[] }) => void;
  template: {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
    templateId: number;
    templateName: string;
    templateTitle: string;
    templateType: string;
  };
}

const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  open,
  onClose,
  onNext,
  template,
}) => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [resources, setResources] = useState<Resource[]>([
    { id: "1", name: "John Doe", kerberos: "jdoe" }, // Added random object
  ]);
  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchProductDetails = async () => {
    if (!productCode.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/ve/product/${productCode}`);
      if (!response.ok) throw new Error("Failed to fetch product details");
      const data: ProductResponse = await response.json();
      setProductName(data.productName);
      setResources([...data.resourcesStaffed, ...resources]); // Add new resources
    } catch (error) {
      console.error(error);
      setResources([...resources]); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const handleResourceSelect = (resourceId: string) => {
    const resource = resources.find((r) => r.id === resourceId);
    if (resource && !selectedResources.includes(resource)) {
      setSelectedResources([...selectedResources, resource]);
    }
  };

  const handleResourceRemove = (resourceId: string) => {
    setSelectedResources(selectedResources.filter((r) => r.id !== resourceId));
  };

  const isNextDisabled = !productCode.trim() || !productName.trim() || (resources.length > 0 && selectedResources.length === 0);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" classes={{ paper: styles.dialog }}>
      <DialogTitle className={styles.dialogTitle}>
        {template.templateName}
        <Tooltip
          title={
            <div>
              <Typography variant="subtitle1"><strong>Template ID:</strong> {template.templateId}</Typography>
              <Typography variant="subtitle1"><strong>Template Name:</strong> {template.templateName}</Typography>
              <Typography variant="subtitle1"><strong>Category ID:</strong> {template.categoryId}</Typography>
              <Typography variant="subtitle1"><strong>Category Name:</strong> {template.categoryName}</Typography>
              <Typography variant="subtitle1"><strong>Template Title:</strong> {template.templateTitle}</Typography>
              <Typography variant="subtitle1"><strong>Template Type:</strong> {template.templateType}</Typography>
            </div>
          }
          placement="bottom"
          arrow
        >
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent dividers className={styles.dialogContent}>
        <div className={styles.row}>
          <TextField
            label="Product Code"
            variant="outlined"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            onBlur={handleFetchProductDetails}
            fullWidth
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
            className={styles.input}
          />
        </div>
        {resources.length > 0 && (
          <div className={styles.section}>
            <Select
              label="Staffed Resources"
              fullWidth
              onChange={(e) => handleResourceSelect(e.target.value as string)}
              value=""
            >
              {resources.map((resource) => (
                <MenuItem key={resource.id} value={resource.id}>
                  {resource.name}
                </MenuItem>
              ))}
            </Select>
            <div className={styles.tags}>
              {selectedResources.map((resource) => (
                <Chip
                  key={resource.id}
                  label={resource.name}
                  onDelete={() => handleResourceRemove(resource.id)}
                  className={styles.tag}
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </Button>
        <Tooltip title={isNextDisabled ? "Please provide details for required fields" : ""}>
          <span>
            <Button
              onClick={() => onNext({ productCode, productName, resources: selectedResources })}
              className={styles.nextButton}
              disabled={isNextDisabled}
            >
              Next
            </Button>
          </span>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateDetailModal;
