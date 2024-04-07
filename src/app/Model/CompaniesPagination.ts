import { companies } from "./companies";

export interface CompaniesPagination {
    items: companies [];
    page: number;
    limit: number;
    totalCount: number;
  }