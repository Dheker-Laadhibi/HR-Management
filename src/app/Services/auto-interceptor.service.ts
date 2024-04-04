import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
}from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'app/Model/session';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the userData from localStorage
        const userDataString = localStorage.getItem('userData');
        let accessToken = '';

        // Parse the userData to extract the access token
        if (userDataString) {
            const userData: UserData = JSON.parse(userDataString);
            accessToken = userData.data?.accessToken || '';
        }

        // Clone the request and add the token to the headers if it exists
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        // Pass the request on to the next handler
        return next.handle(request);
    }
}



