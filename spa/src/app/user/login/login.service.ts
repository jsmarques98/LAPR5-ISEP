import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';


@Injectable({providedIn:'root'})
export class LoginService {
  flag=true;
  userDTO;
  constructor(private http: HttpClient) {
    
  }

    setSession(authResult) {
      this.userDTO=authResult.userDTO;
      
      localStorage.setItem('id_token', authResult.token);
    } 


   login(email:string){
    return this.http.post(environment.logisticsAPI+environment.logisticsAPILogin,{email:email});
  }

  logout() {
    localStorage.removeItem("id_token");
    return this.http.post(environment.logisticsAPI+environment.logisticsAPILogout,{});
  }


  getUserDetails(): Observable<User> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.get<User>(environment.logisticsAPI+environment.logisticsAPIUserInfo,{headers});
  }



}

