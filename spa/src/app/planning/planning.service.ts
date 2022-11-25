import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Planning } from './planning';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn:'root'})
export class PlanningService {
 
  logisticsURL: string = "http://localhost:3000/api/";
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  checkBestPossibleRoute(planning:Planning): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(planning);


    let params = new HttpParams().set('truckPlate', planning.truckPlate).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get(this.logisticsURL + 'plannings/allRoutes',{ params: params }).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Empacotamento criado com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao criar empacotamento!',true);
      }
      return throwError(err);
    }));
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}