import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Section } from './section';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn:'root'})
export class SectionService {
 
  logistcsURL: string = "http://localhost:3000/api/";
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addSection(section:Section): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(section);
    console.log(body)
    return this.http.post(this.logistcsURL + 'sections', body,{'headers':headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('POST EFETUADO COM SUCESSO!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('POST EFETUADO SEM SUCESSO!',true);
      }
      if (err.status == 500) {
        this.mostrarNotificacao('POST INVÁLIDO:\n DEVE TER PELO MENOS 1 TAG EM COMUM COM ESSE UTILIZADOR!\n OU JÁ FEZ UM PEDIDO DE LIGAÇÃO!',true);
      }
      return throwError(err);
    }));
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}