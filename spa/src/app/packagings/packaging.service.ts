import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Packaging } from './packaging';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, toArray } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';
import { DeliveryService } from '../deliveries/delivery.service';
import { ary } from 'cypress/types/lodash';

@Injectable({providedIn:'root'})
export class PackagingService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar,private deliveryService:DeliveryService) {

  }
 

 
  addPackaging(packaging:Packaging): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'}  
    const body=JSON.stringify(packaging);
    console.log(body)
    return this.http.post(environment.logisticsAPI + environment.logisticsAPIPackagings, body,{headers,observe:'response'});
  }

  updatePackaging(packaging:Packaging): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'}  
    const body=JSON.stringify(packaging);
    return this.http.put(environment.logisticsAPI + environment.logisticsAPIPackagings, body,{headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Empacotamento alterado com sucesso!',false);
      }
      if (err.status == 500) {
        
        this.mostrarNotificacao(err,true);
      }
      return throwError(err);
    }));
  }

   getPackagings():Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'}  
    return  this.http.get<Packaging[]>(environment.logisticsAPI +environment.logisticsAPIPackagings,{headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter entregas!',true);
      }
      return throwError(err);
    }));

    
  }

  async orderByDate(packaging: any): Promise<Observable<any>> {

    packaging.sort((a, b) => {
     
      if (new Date(a.deliveryDate) < new Date(b.deliveryDate)) {
        return -1;
      }

      if (new Date(a.deliveryDate) > new Date(b.deliveryDate)) {
        return 1;
      }
    
      return 0;
    });
  
    return of(packaging)
  }

  async orderByWarehouseId(packaging: any): Promise<Observable<any>> {

    packaging.sort((a, b) => {      
      if (new Number(a.deliveryWarehouseId) < new Number(b.deliveryWarehouseId)) { 
        return -1;
      }

      if (new Number(a.deliveryWarehouseId) > new Number(b.deliveryWarehouseId)) {
        return 1;
      }
      return 0;
    });
    return of(packaging)
  }

  async filterByDate(packaging: any, deliveryDate: string): Promise<Observable<any>> {

    const filteredItems = packaging.filter(item => item.deliveryDate === deliveryDate);
  
    return of(filteredItems)
  }

  async filterByWarehouseId(packaging: any, deliveryWarehouseId: string): Promise<Observable<any>> {

    const filteredItems = packaging.filter(item => item.deliveryWarehouseId === deliveryWarehouseId);
  
    return of(filteredItems)
  }


  
   getinfoDeliveriesForPackagings(packagings: any ):Observable<any> {
    for (let index = 0; index < packagings.length; index++) {
      ( this.deliveryService.getDelivery(packagings[index].deliveryId)).subscribe(res => {
        if (res != null) {
          packagings[index].deliveryDate=res.deliveryDate
          packagings[index].deliveryWarehouseId=res.deliveryWarehouseId
          packagings[index].filter=false
        }
      });
     }
    return of(packagings)
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}