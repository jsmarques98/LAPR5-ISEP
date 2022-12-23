import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Warehouse } from './warehouses';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class WarehouseService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  addWarehouse(warehouse:Warehouse): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(warehouse);
    console.log(body)
    return this.http.post(environment.warehouseManagementAPI+environment.warehouseManagementAPIWarehouses, body,{'headers':headers}).pipe(catchError(err => {
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

  getWarehouses(): Observable<any> {
      
    return this.http.get<Warehouse[]>(environment.warehouseManagementAPI+environment.warehouseManagementAPIWarehouses).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Armazéns obtidos com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter armazéns!',true);
      }
      return throwError(err);
    }));
  }

  getWarehouseById(warehouseId: String): Observable<Warehouse>{

    return this.http.get<Warehouse>(environment.warehouseManagementAPI+environment.warehouseManagementAPIWarehouses + warehouseId).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Armazém obtido com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao obter armazém!',true);
      }
      return throwError(err);
    }));
  }

  updateWarehouse(warehouse:Warehouse): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(warehouse);
    const warehouseId = warehouse.id;
    return this.http.put(environment.warehouseManagementAPI+environment.warehouseManagementAPIWarehouses + warehouseId, body,{'headers':headers}).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Armazém alterado com sucesso!',false);
      }
      if (err.status == 500) {
        
        this.mostrarNotificacao(err,true);
      }
      return throwError(err);
    }));
  }

  deleteWarehouse(warehouseId: string): Observable<Warehouse> {

    return this.http.delete<Warehouse>(environment.warehouseManagementAPI+environment.warehouseManagementAPIWarehouses+ warehouseId,).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Armazém removido com sucesso! Id armazém=${warehouseId}',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao remover armazém!',true);
      }
      return throwError(err);
    }));
  }

  inactivateWarehouse(warehouseId: string): Observable<any> {
    
    return this.http.delete<any>(environment.warehouseManagementAPI+environment.warehouseManagementAPIWarehouses + warehouseId + '/soft').pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Armazém inibido com sucesso!',false);
      }
      if(err.status == 500){
        this.mostrarNotificacao('Não existe esse armazém', true);
      }
      return throwError(err);
    }))
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}