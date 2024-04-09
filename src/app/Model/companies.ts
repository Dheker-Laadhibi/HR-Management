import { Users } from "./Users";

export interface CompanyIn {
  name: string; // Name is the name of the company. It is required and should be between 3 and 30 characters.
}

export interface CompaniesPagination {
  items: CompaniesTable[]; // Items is a slice containing individual company details.
  page: number; // Page is the current page number in the pagination.
  limit: number; // Limit is the maximum number of items per page in the pagination.
  totalCount: number; // TotalCount is the total number of companies in the entire list.
}

export interface CompaniesTable {
  id: string; // ID is the unique identifier for the company.
  name: string; // Name is the name of the company.
  email: string; // Email is the email address associated with the company.
  createdAt: Date; // CreatedAt is the timestamp indicating when the company entry was created.
  website: string;
}

export interface CompaniesDetails {
  id: string; // ID is the unique identifier for the company.
  name: string; // Name is the name of the company.
  email: string; // Email is the email address associated with the company.
  website: string; // Website is the website URL of the company.
  createdAt: Date; // CreatedAt is the timestamp indicating when the company entry was created.
}