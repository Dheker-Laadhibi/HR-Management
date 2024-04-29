import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { UserData } from 'app/Model/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  
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
  addIntern(companyID: string, supervisorID: string , internIn:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/interns/${companyID}/add/${supervisorID}`, internIn, { headers: this.headers });
  }
  updateIntern(companyID:string, internID: string , internUpdate:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/interns/${companyID}/update/${internID}`,internUpdate,{ headers: this.headers });
  }
  getAllInterns(companyID:string,  page: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/interns/${companyID}?page=${page}&limit=${limit}`, {  headers: this.headers });
  }
 deleteIntern(companyID: string , internID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/interns/${companyID}/delete/${internID}`, {  headers: this.headers });
  }

  getOneIntern(companyID: string,internID :string): Observable<any> {
    return this.http.get(`${this.apiUrl}/interns/${companyID}/intern/${internID}`, {  headers: this.headers });
  }
}