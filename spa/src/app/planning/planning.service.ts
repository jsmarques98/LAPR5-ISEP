import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Planning } from './planning';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Warehouse } from '../warehouses/warehouses';
import { Truck } from '../trucks/truck';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class PlanningService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  checkBestPossibleRoute(planning:Planning): Observable<any> {
      
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI + environment.logisticsAPIPlanningBestRoute ,{ params: params }).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Melhor caminho encontrado com sucesso!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao encontrar o melhor caminho!',true);
      }
      return throwError(err);
    }));
  }


  checkRouteHeuristicMass(planning:Planning): Observable<any> {
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI +environment.logisticsAPIPlanningHeuristicMass,{ params: params }).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Caminho encontrado com sucesso com utilizaçáo da heurística da massa!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao encontrar caminho!',true);
      }
      return throwError(err);
    }));
  }

  checkRouteHeuristicTime(planning:Planning): Observable<any> {
      
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI +environment.logisticsAPIPlanningHeuristicTime,{ params: params }).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Caminho encontrado com sucesso com utilizaçáo da heurística do tempo!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao encontrar caminho!',true);
      }
      return throwError(err);
    }));
  }

  checkRouteHeuristicTimeAndMass(planning:Planning): Observable<any> {
      
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI +environment.logisticsAPIPlanningHeuristicTimeAndMass,{ params: params }).pipe(catchError(err => {
      if (err.status == 200) {
        this.mostrarNotificacao('Caminho encontrado com sucesso com utilizaçáo da heurística da massa e tempo em conjunto!',false);
      }
      if (err.status == 400) {
        this.mostrarNotificacao('Erro ao encontrar caminho!',true);
      }
      return throwError(err);
    }));
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}