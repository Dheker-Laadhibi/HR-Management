import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { UserData } from 'app/Model/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

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


    getAllGenders( companyId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/users/${companyId}/gender`, { headers: this.headers });
      
    }


























}
