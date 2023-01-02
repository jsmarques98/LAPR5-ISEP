import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private http: HttpClient,private notification:MatSnackBar) { }

  updateUserInfo(user:User): Observable<any> {
    
    const newObj = {};
    Object.keys(user).forEach(key => {
      if (user[key] && user[key] !== '') {
        newObj[key] = user[key];
      } 
    });

    const body = JSON.stringify(newObj);

    
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.patch<any>(environment.logisticsAPI+environment.logisticsAPIUpdateUsers,body,{headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('User atualizado com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao atualizar user!',true);
      }
      return throwError(err);
      }));
    }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
}
