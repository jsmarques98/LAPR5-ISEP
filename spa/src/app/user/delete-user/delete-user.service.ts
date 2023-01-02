import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http: HttpClient,private notification:MatSnackBar) { }


  deleteUser(email : string): Observable<any>{
    const token = localStorage.getItem('id_token')!;

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Token '+token);

    const params = new HttpParams().set("email", email);


    return this.http.delete<any>(environment.logisticsAPI+environment.logisticsAPIDeleteUsers,{headers,params}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('User eliminado com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao eliminar user!',true);
      }
      return throwError(err);
    }));
  }


  getUser(email: string): Observable<User>{
    const token = localStorage.getItem('id_token')!;

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Token '+token);

    const params = new HttpParams().set("email", email);
    

    return this.http.get<User>(environment.logisticsAPI+environment.logisticsAPIGetUserByEmail,{headers,params}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('User obtido com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter user!',true);
      }
      return throwError(err);
    }));
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
}
