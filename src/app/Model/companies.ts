import { Users } from "./Users";

export  interface Companies {
    id?: string; // Unique identifier for the company
    name?: string; // The company's name
    email?: string; // The company's email (optional)
    website?: string; // The company's website (optional)
    team: Users[]; // List of users associated with the company
    createdByUserId?: string; // ID of the user who created the company
  }