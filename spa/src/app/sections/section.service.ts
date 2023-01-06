import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Section } from './section';
import { Injectable } from '@angular/core';
import { catchError, Observable, skip, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class SectionService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addSection(section:Section): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'}  
  
    const body=JSON.stringify(section);

   return this.http.post(environment.logisticsAPI+ environment.logisticsAPIPSections, body,{headers,observe:'response'});

   
  }


  getSections(skip:number, limit:number): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const params = new HttpParams().set('skip', skip).set('limit', limit);
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'}
    return this.http.get<Section[]>(environment.logisticsAPI+ environment.logisticsAPIPSections+environment.Pagination,{headers:headers,params: params}).pipe(catchError(err => {
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
    const token = localStorage.getItem('id_token')!;
   
    let deleteOptions =  {headers: new HttpHeaders({ 'Authorization' : 'Token ' + token,'Content-Type': 'application/json' }),
           body : {'id' : sectionId}     }
  
    return this.http.delete<any>(environment.logisticsAPI+ environment.logisticsAPIPSections,deleteOptions,).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}