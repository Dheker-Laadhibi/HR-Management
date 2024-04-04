import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompaniesPagination } from 'app/Model/CompaniesPagination';
import { Companies } from 'app/Model/companies';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompanieServiceService {
  private apiUrl ='http://localhost:8080' ;
  constructor(private http:HttpClient ) { }
  /* createCompany(companyData: Companies): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/companies`, companyData) 
      .pipe(
        catchError(error => {
          throw 'Error in creating company: ' + error.message;
        })
      );
  } */


  getCompanies(): Observable<Companies> {
    return this.http.get<Companies>(`${this.apiUrl}/api/companies`)
      .pipe(
        catchError(error => {
          throw 'Error in retrieving companies: ' + error.message;
        })
      );
  }





















}
