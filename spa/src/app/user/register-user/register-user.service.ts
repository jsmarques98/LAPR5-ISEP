import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient,private notification:MatSnackBar) { }

  getRoles(): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.get<any>(environment.logisticsAPI+environment.logisticsAPIRoles,{headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Roles obtidos com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter roles!',true);
      }
      return throwError(err);
    }));
  }


  registerUser(user:User): Observable<any> {
    const body=JSON.stringify(user);
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.post<any>(environment.logisticsAPI+environment.logisticsAPIRegistUsers,body,{headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('User registado com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao registar user!',true);
      }
      return throwError(err);
    }));
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
}
