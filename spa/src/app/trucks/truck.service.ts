import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Truck } from './truck';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class TruckService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addTruck(truck:Truck): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(truck);
  
    return this.http.post(environment.logisticsAPI+environment.logisticsAPIPTrucks, body,{'headers':headers}).pipe(catchError(err => {
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

  getTrucks(): Observable<any> {
    return this.http.get<Truck[]>(environment.logisticsAPI+environment.logisticsAPIPTrucks).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Camiões obtidos com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter camiões!',true);
      }
      return throwError(err);
    }));
  }

  deleteTruck(plate : string): Observable<any> {
    console.log(plate);
    let deleteOptions =  {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
           body : {'Plate' : plate}     }
  
    return this.http.delete<any>(environment.logisticsAPI+environment.logisticsAPIPTrucks,deleteOptions).pipe(catchError(err => {
      return throwError(err);
    }));
  }
 
  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

 
}