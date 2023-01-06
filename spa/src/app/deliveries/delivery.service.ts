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

  getDeliveriesLimit(skip:number, limit:number): Observable<any> {
      
    return this.http.get<Delivery[]>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries+environment.Pagination+skip+"/"+limit)
  }

  getDeliveries(): Observable<any> {
      
    return this.http.get<Delivery[]>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries)
  }

  getDelivery(id : string): Observable<any> {
    
    return this.http.get<Delivery>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries+id)
  }

  deleteDeliverie(deliveryId: string): Observable<any> {
  
    return this.http.delete<any>(environment.warehouseManagementAPI+ environment.warehouseManagementAPIDeliveries+ deliveryId)
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}