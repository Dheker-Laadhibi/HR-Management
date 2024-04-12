import { items } from './../mock-api/apps/file-manager/data';
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



   Companies: CompaniesTable[] = []; 
   apiUrl = 'http://localhost:8080/api';
CompaniesPagination: CompaniesPagination; // Property to store fetched companies
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.fetch();
  }


 
 
  
  private getAccessToken(): string {
    const userDataString = localStorage.getItem('userData');
    let accessToken = '';
    if (userDataString) {
      try {
        const userData: UserData = JSON.parse(userDataString);
        accessToken = userData[1].data.accessToken || '';
        console.log("accessToken",accessToken);
        
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    } else {
      console.warn('No userData found in localStorage');
    }
    return accessToken;
  }

   fetch(): void {
    const accessToken = this.getAccessToken();
    this.headers = new HttpHeaders();
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    console.log("accessToken from fetch",accessToken);
    
    console.log('Access Token:', accessToken);
  }


  addCompany( companieIn: CompanyIn): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies`, companieIn, { headers: this.headers });

  }



  updateCompany(companyId: string, CompanyTable: CompaniesTable): Observable<any> {
    return this.http.put(`${this.apiUrl}/companies/${companyId}`, CompanyTable, { headers: this.headers });
  }




  getAllCompanies(  page: number, limit: number): Observable<ApiResponse> {
    
    
    return this.http.get<ApiResponse>(`${this.apiUrl}/companies?page=${page}&limit=${limit}`,{ headers: this.headers }).pipe(
      tap(response => {
        
        console.log("rep:", response);
        
      
          // Store fetched companies in the service
          this.Companies = response.data.items;
       
        console.log("Companies", this.Companies);
        
        
      }), catchError(error => {
        throw 'Error in retrieving companies: ' + error.message;
      })
    );;
  }

 deleteCompany(companyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/companies/${companyId}`, { headers: this.headers });
  }


  
  

 
      




}