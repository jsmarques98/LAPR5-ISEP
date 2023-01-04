import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Delivery } from './delivery';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class DeliveryService {
 
  
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addDelivery(delivery:Delivery): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(delivery);
    console.log(body)
    return this.http.post(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries, body,{'headers':headers,observe:'response'});
      
  }

  getDeliveries(): Observable<any> {
      
    return this.http.get<Delivery[]>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter entregas!',true);
      }
      return throwError(err);
    }));
  }

  getDelivery(id : string): Observable<any> {
    
    return this.http.get<Delivery>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries+id).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter entregas!',true);
      }
      return throwError(err);
    }));
  }

  deleteDeliverie(deliveryId: string): Observable<any> {
  
    return this.http.delete<any>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries+ deliveryId).pipe(catchError(err => {
     
      if (err.status == 200) {
        this.mostrarNotificacao('Delivey removido com sucesso! Id Delivey=${deliveryId}',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao remover Delivey!',true);
      }
      return throwError(err);
    }));
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}