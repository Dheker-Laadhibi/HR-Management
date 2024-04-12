import { CompaniesPagination } from "./companies";


export interface ApiResponse {
    data: CompaniesPagination;
    responseKey: string;
    // Add more properties as needed
}