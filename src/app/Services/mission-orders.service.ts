import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/apiresponse';
import { UserData } from 'app/Model/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionOrdersService {

  page:1;
  limit:10;
   
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



   addMission( companyId: string,userID:string,missionIn: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/missions/${companyId}/${userID}`, missionIn, { headers: this.headers });

  }



  updateMission(companyId: string,ID :string, missionupdate: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/missions/update/${companyId}/${ID}`, missionupdate, { headers: this.headers });
  }




  getAllMissions( companyId: string): Observable<ApiResponse> {
    
    
    return this.http.get<ApiResponse>(`${this.apiUrl}/missions/All/${companyId}`, {  headers: this.headers });
    
  }

 deleteMission(companyId: string,Id :string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/missions/delete/${companyId}/${Id}`, {  headers: this.headers });
  }


 getOneMission(companyId: string,Id :string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/missions/get/${companyId}/${Id}`, {  headers: this.headers });
  }
  
  

 
      







  }