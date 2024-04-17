import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { ProjectIn } from 'app/Model/projects';
import { UserData } from 'app/Model/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  page:1;
  limit:10;
  
     apiUrl = 'http://localhost:8080/api';
 
   // private headers: HttpHeaders;
   private headers: HttpHeaders;
  
   constructor(private http: HttpClient) {
     const userDataString = localStorage.getItem('userData');
     let accessToken = '';
  
     if (userDataString) {
       try {
         const userData: UserData = JSON.parse(userDataString);
         accessToken = userData[1].data.accessToken || '';
       } catch (error) {
         console.error('Error parsing userData:', error);
       }
     } else {
       console.warn('No userData found in localStorage');
     }
  
     console.log('Access Token:', accessToken);
  
     this.headers = new HttpHeaders();
     if (accessToken) {
       this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
     }
   }
// Méthode pour créer un nouveau projet
createProject(companyID: string, project:any     ) {
  // Ajoutez l'ID de l'entreprise à l'URL
  const url = `${this.apiUrl}/projects/${companyID}`;

  // Effectuez la requête POST avec les données du projet et les en-têtes appropriés
  return this.http.post(url, project, { headers: this.headers });
}


updateProject(companyId: string, projectId: string, projectUpdate: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/projects/${companyId}/${projectId}`, projectUpdate, { headers: this.headers });
}

getAllProjects(companyID: string, page : number , limit : number): Observable<ApiResponse> {
    
    
  return this.http.get<ApiResponse>(`${this.apiUrl}/projects/${companyID}?page=${page}&limit=${limit}`, {  headers: this.headers });
  
}
deleteProject(companyId: string,projectId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/projects/${companyId}/${projectId}`, { headers: this.headers }

  );
}




}
