import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { CondidatIn } from 'app/Model/candidat';
import { UserData } from 'app/Model/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {


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
   createCandidat(Companyid: string, Candidat: any): Observable<any> {
    return this.http.post<CondidatIn>(`${this.apiUrl}/candidats/${Companyid}`, Candidat , { headers: this.headers });
  }

  getCandidats(Companyid: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/candidats/${Companyid}`, { headers: this.headers });
  }

  getCandidat
  (Companyid: string,id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/candidats/${Companyid}/${id}`, { headers: this.headers });
  }

  updateUser(Companyid: string,id: string, candidat: CondidatIn): Observable<CondidatIn> {
    return this.http.put<CondidatIn>(`${this.apiUrl}/candidats/${Companyid}/${id}`, candidat, { headers: this.headers });
  }

  deleteUser(Companyid: string,id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/candidats/${Companyid}/${id}`, { headers: this.headers });
  }
















 
}
