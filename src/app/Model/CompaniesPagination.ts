import { Companies } from "./companies";

export interface CompaniesPagination {
    items: Companies [];
    page: number;
    limit: number;
    totalCount: number;
  }