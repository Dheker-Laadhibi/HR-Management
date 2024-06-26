// Interface représentant la structure d'entrée pour la création d'un nouveau projet
export interface ProjectIn {
    code: string;
    projectname: string;
    description: string;
    Specialty: string;
    technologies: Text[];
    expDate: string;
  }
  
  // Interface représentant une entrée de projet dans une table
  export interface ProjectTable {
    id: string;
    code: string;
    Specialty: string;
    projectname: string;
    technologies: string[];
    companyID: string;
    expdate: string;
  }

  
  // Interface représentant des informations détaillées sur un projet spécifique
  export  interface ProjectsDetails {
    id: string;
    code: string;
    projectname: string;
    technologies: string[];
    companyID: string;
    expDate: string;
  }
  