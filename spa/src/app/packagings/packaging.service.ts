import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Packaging } from './packaging';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, toArray } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';
import { DeliveryService } from '../deliveries/delivery.service';
import { from } from 'rxjs';
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
    return this.http.post(environment.logisticsAPI + environment.logisticsAPIPackagings, body,{headers}).pipe(catchError(err => {
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
    let packagings
     packagings=  this.http.get<Packaging[]>(environment.logisticsAPI +environment.logisticsAPIPackagings,{headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter entregas!',true);
      }
      return throwError(err);
    }));
   
    return packagings  
  }

  async orderByDate(packaging: any): Promise<Observable<any>> {

    packaging.sort((a, b) => {
     
      if (a.deliveryDate < b.deliveryDate) {
        return -1;
      }

      if (a.deliveryDate > b.deliveryDate) {
        return 1;
      }
    
      return 0;
    });
  
    return of(packaging)
  }

  async filterByDate(packaging: any): Promise<Observable<any>> {

    const filteredItems = packaging.filter(item => item.deliveryDate === '05/12/2022');
  
    return of(filteredItems)
  }


  
  getinfoDeliveriesForPackagings(packagings: Observable<Packaging> ): Observable<any>  {

    let deleviriesId =new Array
    let json
    packagings.forEach(function(nome) {
      json= JSON.parse(JSON.stringify(nome))
      for (let index = 0; index < json.length; index++) {
        deleviriesId[index] = json[index].deliveryId;
      }
    })

    for (let index = 0; index < deleviriesId.length; index++) {
      (this.deliveryService.getDelivery(deleviriesId[index])).subscribe(res => {
        if (res != null) {
          json[index].deliveryDate=res.deliveryDate
          json[index].deliveryWarehouseId=res.deliveryWarehouseId
        }
      });
     }
    return json
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}