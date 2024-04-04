import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from 'app/Model/signin';

@Injectable({
  providedIn: 'root'
})
export class SigninService {


private baseUrl  = 'http://localhost:8080' ;



  constructor(private http:HttpClient ) {

  }


    SignInUser(Sign:SignIn){
        const apiUrl=`${this.baseUrl}/api/auth/signin`;

        console.log(this.http.post<SignIn>);
        return this.http.post<SignIn>(apiUrl,Sign);
    }

}
