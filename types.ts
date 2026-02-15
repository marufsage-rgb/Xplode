
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  FINANCE = 'FINANCE',
  BANKING = 'BANKING',
  INVENTORY = 'INVENTORY',
  SALES = 'SALES',
  HRM = 'HRM',
  PROCUREMENT = 'PROCUREMENT',
  FILE_MANAGER = 'FILE_MANAGER',
  SETTINGS = 'SETTINGS'
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  address: string;
  taxNumber: string;
}

export interface BankAccount {
  id: string;
  name: string;
  number: string;
  bankName: string;
  balance: number;
  currency: string;
  type: 'Bank' | 'Cash';
}

export interface ERPDocumentItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  taxRate: number;
  unit?: string;
}

export interface ERPDocument {
  id: string;
  number: string;
  date: string;
  dueDate?: string;
  entityId: string; // Customer or Supplier ID
  entityName: string;
  items: ERPDocumentItem[];
  status: string;
  currency: string;
  total: number;
  type: 'Invoice' | 'Quote' | 'DeliveryNote' | 'PurchaseNote' | 'MRN' | 'StockIn' | 'StockOut';
  reference?: string;
}

export interface FileMetadata {
  id: string;
  filename: string;
  file_hash: string;
  content_type: string;
  size: number;
  upload_date: string;
  uploader_ip: string;
  folder_path: string;
  is_hidden: boolean;
  download_password?: string;
  version: number;
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  parentId: string | null;
}
