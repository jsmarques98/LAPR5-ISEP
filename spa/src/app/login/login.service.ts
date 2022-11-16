import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {
  }


  login(email:string,password:string): boolean{
      return true;
  }

  logout():boolean {
      return true;
  }


}