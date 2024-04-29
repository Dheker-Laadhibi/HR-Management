import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { UserData } from 'app/Model/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  page:1;
  limit:10;
   
     apiUrl = 'http://localhost:8080/api';
 // Property to store fetched companies
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
    addRole( companyId: string,roleIn: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/roles/${companyId}`, roleIn, { headers: this.headers });
  
    }
  
  
  
    updateRole(companyId: string,roleId :string, roleTable: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/roles/${companyId}/${roleId}`, roleTable, { headers: this.headers });
    }
  
  
  
  
    getAllRoles( companyId: string, page: number, limit: number): Observable<ApiResponse> {
      
      
      return this.http.get<ApiResponse>(`${this.apiUrl}/roles/${companyId}?page=${page}&limit=${limit}`, {  headers: this.headers });
      
    }
  
   deleteRole(companyId: string,roleId :string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/roles/${companyId}/${roleId}`, {  headers: this.headers });
    }
  
  
    
    
  
   
        
  
  
  
  
  }