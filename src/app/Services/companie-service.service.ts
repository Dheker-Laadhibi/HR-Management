import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Companies  } from 'app/Model/companies';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserData } from 'app/Model/session';
import { CompaniesPagination } from 'app/Model/CompaniesPagination';
import { ApiResponse } from 'app/Model/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class CompanieServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<ApiResponse> {
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
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/companies`,{headers })
      .pipe(
        catchError(error => {
          throw 'Error in retrieving companies: ' + error.message;
        })
      );
  }
}