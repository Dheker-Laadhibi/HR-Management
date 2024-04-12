import { Users } from "./Users";

export interface CompanyIn {
  name: string; // Name is the name of the company. It is required and should be between 3 and 30 characters.
}

export interface CompaniesPagination {
 
    items: CompaniesTable[];
    page: number;
    limit: number;
    totalCount: number;
  
}

export interface CompaniesTable {
  id: string; // ID is the unique identifier for the company.
  name: string; // Name is the name of the company.
  email: string; // Email is the email address associated with the company.
  createdAt: string; // CreatedAt is the timestamp indicating when the company entry was created.
  website: string;


  // companies.model.ts





}

export interface CompaniesDetails {
  id: string; // ID is the unique identifier for the company.
  name: string; // Name is the name of the company.
  email: string; // Email is the email address associated with the company.
  website: string; // Website is the website URL of the company.
  createdAt: Date; // CreatedAt is the timestamp indicating when the company entry was created.
}