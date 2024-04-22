

// Input structure for creating a new candidate
export interface CondidatIn {
    firstName: string; // First name of the candidate (3-30 characters)
    lastName: string; // Last name of the candidate (3-30 characters)
    adress: string; // Address of the candidate (3-30 characters)
    email: string; // Email address of the candidate (required, valid email, max 255 characters)
    education_level: string; // Education level of the candidate (3-30 characters)
    role_name: string; // Role name of the candidate
    university: string; // University of the candidate (3-30 characters)
    password: string; // Password of the candidate (required, min 10, max 255 characters)
}

// Paginated list of candidates
export interface CondidtasPagination {
    items: CondidatsTable[]; // Slice containing individual candidate details
    page: number; // Current page number in pagination
    limit: number; // Maximum number of items per page in pagination
    totalCount: number; // Total number of candidates in the entire list
}

// Single candidate entry in a table
export interface CondidatsTable {
    id: string; // Unique identifier for the candidate
    firstname: string; // First name of the candidate
    lastname: string; // Last name of the candidate
    email: string; // Email address of the candidate
}

// Simplified version of candidates for listing purposes
export interface CondidatsList {
    id: string; // Unique identifier for the candidate
    firstname: string; // First name of the candidate
    lastname: string; // Last name of the candidate
}

// Count of candidates
export interface CondidatsCount {
    count: number; // Number of candidates
}

// Detailed information about a specific candidate
export interface CondidatDetails {
    id: string; // Unique identifier for the candidate
    firstname: string; // First name of the candidate
    lastname: string; // Last name of the candidate
    companyID: string; // Unique identifier for the company associated with the candidate
    companyName: string; // Name of the company associated with the candidate
    educationLevel: string; // Level of education of the candidate
    university: string; // University of the candidate
    roleName: string; // Role name of the candidate
}

// Information required for signing in candidate
export interface Signin {
    email: string; // Email address of the user (required, valid email, max 255 characters)
    password: string; // Password of the user (required, min 10, max 255 characters)
}

// Response structure after successful login
export interface LoggedInResponse {
    accessToken: string; // Token obtained after successful login for authentication purposes
    Candidat: LoggedIn; // Details of the logged-in candidate
}

// Candidate details after successful login
export interface LoggedIn {
    ID: string; // Unique identifier for the candidate
    name: string; // Name of the candidate
    email: string; // Email address of the candidate
    workCompanyId: string; // Unique identifier for the candidate company
}

