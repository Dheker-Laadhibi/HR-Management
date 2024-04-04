import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<any> {
    // Make an HTTP POST request to your backend API
    return this.http.post<any>('http://localhost:8080/api/auth/signup', userData);
  }
}
