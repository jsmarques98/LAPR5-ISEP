import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Section } from './section';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class SectionService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addSection(section:Section): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'authorization' : 'Token ' + token}  

    const body=JSON.stringify(section);
    console.log(body)
    return this.http.post(environment.logisticsAPI+ environment.logisticsAPIPSections, body,{'headers':headers}).pipe(catchError(err => {
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


  getSections(): Observable<any> {
      
    return this.http.get<Section[]>(environment.logisticsAPI+ environment.logisticsAPIPSections).pipe(catchError(err => {
      if (err.status == 201) {
        this.mostrarNotificacao('POST EFETUADO COM SUCESSO!',false);
      }
      if (err.status == 402) {
        this.mostrarNotificacao('POST EFETUADO SEM SUCESSO!',true);
        this.mostrarNotificacao(err.error,true);
      }
      if (err.status == 500) {
        this.mostrarNotificacao('POST INVÁLIDO:',true);
        this.mostrarNotificacao(err.error,true);
      }
      return throwError(err);
    }));
  }

  deleteSection(sectionId : string): Observable<any> {
   
    let deleteOptions =  {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
           body : {'id' : sectionId}     }
  
    return this.http.delete<any>(environment.logisticsAPI+ environment.logisticsAPIPSections,deleteOptions).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}