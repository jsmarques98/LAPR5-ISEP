import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Packaging } from './packaging';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class PackagingService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addPackaging(packaging:Packaging): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(packaging);
    return this.http.post(environment.logisticsAPI + environment.logisticsAPIPackagings, body,{'headers':headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Empacotamento criado com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao criar empacotamento!',true);
      }
      return throwError(err);
    }));
  }

  updatePackaging(packaging:Packaging): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(packaging);
    return this.http.put(environment.logisticsAPI + environment.logisticsAPIPackagings, body,{'headers':headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Empacotamento alterado com sucesso!',false);
      }
      if (err.status == 500) {
        
        this.mostrarNotificacao(err,true);
      }
      return throwError(err);
    }));
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}