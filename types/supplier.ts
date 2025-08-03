type Supplier = {
    id: string; 
    supplierName: string;
    cnpj?: string;
    phoneNumber: string;
    email?: string;
    additionalInformation?: string;
}

export interface UpdateSupplierDto {
  id: string;
  supplierName: string;
  cnpj?: string;
  phoneNumber?: string;
  email?: string;
  additionalInformation?: string;
}

export default Supplier;
