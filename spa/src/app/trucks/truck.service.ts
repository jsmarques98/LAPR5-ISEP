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
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    const body=JSON.stringify(truck);
  
    return this.http.post(environment.logisticsAPI+environment.logisticsAPIPTrucks, body,{headers}).pipe(catchError(err => {
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

  getTrucks(): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.get<Truck[]>(environment.logisticsAPI+environment.logisticsAPIPTrucks,{headers}).pipe(catchError(err => {
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
    const token = localStorage.getItem('id_token')!;
    let deleteOptions =  {headers: new HttpHeaders({'Authorization' : 'Token ' + token, 'Content-Type': 'application/json' }),
           body : {'Plate' : plate}     }
  
    return this.http.delete<any>(environment.logisticsAPI+environment.logisticsAPIPTrucks,deleteOptions).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  inactiveTruck(plate : string): Observable<any> {
    try{
      const token = localStorage.getItem('id_token')!;
        let  inactiveOptions =  {headers: new HttpHeaders({ 'Authorization' : 'Token ' + token,'Content-Type': 'application/json' }),
              body : {'Plate' : plate}     }
          
        return this.http.delete<any>(environment.logisticsAPI+environment.logisticsAPIInactiveTrucks, inactiveOptions).pipe(catchError(err => {
       
          if (err.status == 200) {
            this.mostrarNotificacao(err.error,false);
          }
          if (err.status == 400) {
          
            this.mostrarNotificacao(err.error,true);
          }
          if (err.status == 500) {
        
            this.mostrarNotificacao(err.error,true);
          }
          return throwError(err);
        }));
      }catch(err){
        return throwError(err);
      }

  }

  activateTruck(plate : string): Observable<any> {
    try{
      const token = localStorage.getItem('id_token')!;
        let  inactiveOptions =  {headers: new HttpHeaders({ 'Authorization' : 'Token ' + token,'Content-Type': 'application/json' }),
              body : {'Plate' : plate}  }
        return this.http.patch<any>(environment.logisticsAPI + environment.logisticsAPIPTrucks, inactiveOptions ).pipe(catchError(err => {
       
          if (err.status == 200) {
            this.mostrarNotificacao(err.error,false);
          }
          if (err.status == 400) {
          
            this.mostrarNotificacao(err.error,true);
          }
          if (err.status == 500) {
        
            this.mostrarNotificacao(err.error,true);
          }
          return throwError(err);
        }));
      }catch(err){
        return throwError(err);
      }

  }
  


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

 
}