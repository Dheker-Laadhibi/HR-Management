import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { UserData } from 'app/Model/session';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { companies } from 'app/Model/companies';


@Injectable({
  providedIn: 'root'
})
export class CompanieServiceService {
  private apiUrl = 'http://localhost:8080';

  private companies: any[] = []; // Property to store fetched companies

  constructor(private http: HttpClient) { }

  fetch(): Observable<ApiResponse> {
    // Get the userData from localStorage
    const userDataString = localStorage.getItem('userData');
    let accessToken = '';

    // Parse the userData to extract the access token
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

    // Log the token value for debugging
    console.log('Access Token:', accessToken);

    // Clone the request and add the token to the headers if it exists
    let headers = new HttpHeaders();
    if (accessToken) {
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // Send the HTTP request with the updated headers
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/companies`, { headers })
      .pipe(
        tap(response => {
          // Store fetched companies in the service
          this.companies = response.data.items;
        }),
        catchError(error => {
          throw 'Error in retrieving companies: ' + error.message;
        })
      );
  }

  // Get stored companies
  getCompanies(): any[] {
    return this.companies;
  }
}