export interface Users {
    id?: string; // Unique identifier for the user
    firstName?: string; // The user's first name
    lastName?: string; // The user's last name
    email?: string; // User's email address (unique)
    password?: string; // User's Password
    dateOfBirth?: Date; // User's date of birth
    gender?: string; // User's gender
    address?: string; // User's address
    country?: string; // User's country
    phoneNumber?: string; // User's phone number
    dateOfHire?: Date; // User's date of hire
    leaveBalance?: number; // User's leave balance
    cvPath?: string; // Path to user's CV
    lastLogin?: Date; // The last time the user authenticated (optional)
    departmentName?: string; // User's department name
   // roleId?: string; // ID of the role assigned to the user
    companyId?: string; // ID of the company to which the user belongs
  }
