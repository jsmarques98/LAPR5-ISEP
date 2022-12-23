import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({providedIn:'root'})
export class LoginService {
  flag=true;
  constructor(private http: HttpClient) {
    
  }

    setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
   } 


   login(email:string){
    return this.http.post(environment.logisticsAPI+environment.logisticsAPILogin,{email:email});
  }

  logout() {
    localStorage.removeItem("id_token");
    return this.http.post(environment.logisticsAPI+environment.logisticsAPILogout,{});
  }


}

