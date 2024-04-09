import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { UserData } from 'app/Model/session';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CompaniesPagination, CompaniesTable, CompanyIn } from 'app/Model/companies';



@Injectable({
  providedIn: 'root'
})
export class CompanieServiceService {

  private apiUrl = 'http://localhost:8080/api';
  private companies: CompaniesTable[] = [];
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
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
    this.headers = new HttpHeaders();
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }


  getAllCompanies( ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/companies`,{ headers: this.headers }).pipe(
      tap(response => {
        // Store fetched companies in the service
        this.companies = response.data.items;
      }), catchError(error => {
        throw 'Error in retrieving companies: ' + error.message;
      })
    );;
  }

  getCompanies(): CompaniesTable[] {
    return this.companies;
  }
  setCompanies(companies: CompaniesTable[]): void {
    this.companies = companies;
  }


  addCompany( companieIn: CompanyIn): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies`, companieIn, { headers: this.headers });
  }






  //nour code

/*
private apiUrl = 'http://localhost:8080/api';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
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
    this.headers = new HttpHeaders();
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  addLoanRequest(companyId: string, request: LoanRequestDemande): Observable<any> {
    return this.http.post(`${this.apiUrl}/loan_requests/${companyId}`, request, { headers: this.headers });
  }

  getAllLoanRequestsByUser(userId: string, page: number, limit: number): Observable<LoanRequestPagination> {
    return this.http.get<LoanRequestPagination>(`${this.apiUrl}/loan_requests/user/${userId}?page=${page}&limit=${limit}`, { headers: this.headers });
  }

*/ 






}