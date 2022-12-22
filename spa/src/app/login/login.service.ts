import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';


@Injectable({providedIn:'root'})
export class LoginService {
  flag=true;
  constructor(private http: HttpClient) {
    
  }

    setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
   } 


   login(email:string){
    return this.http.post('http://localhost:3000/api/auth/ssosignin',{email:email});
  }

  logout() {
    localStorage.removeItem("id_token");
    return this.http.post("http://localhost:3000/api/auth/logout",{});
  }


}

