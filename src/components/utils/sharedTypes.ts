export interface TemplateField {
    id: number;
    label: string;
    name: string;
    type: string;
  }
  
  export interface Document {
    templateId: number;
    templateName: string;
    templateTitle: string;
    templateType: string;
    templateDescription: string;
    templateModalFields: TemplateField[];
  }
  
  export interface Category {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
    documents: Document[];
  }
  