import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Planning } from './planning';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Warehouse } from '../warehouses/warehouses';
import { Truck } from '../trucks/truck';
import { environment } from 'src/environments/environment';
import { PlanningGenetic } from './route-genetic-algorithm/planningGenetic';

@Injectable({providedIn:'root'})
export class PlanningService {
 
 
  constructor(private http: HttpClient,private notification:MatSnackBar) {
  }
 

 
  checkBestPossibleRoute(planning:Planning): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI + environment.logisticsAPIPlanningBestRoute ,{headers ,params: params });
  }


  checkRouteHeuristicMass(planning:Planning): Observable<any> {
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.get<Warehouse[]>(environment.logisticsAPI +environment.logisticsAPIPlanningHeuristicMass,{headers , params: params })
  }

  checkRouteHeuristicTime(planning:Planning): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI +environment.logisticsAPIPlanningHeuristicTime,{ headers ,params: params })
  }

  checkRouteHeuristicTimeAndMass(planning:Planning): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    let params = new HttpParams().set('truckName', planning.truckName).set('deliveryDate', planning.deliveryDate);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI +environment.logisticsAPIPlanningHeuristicTimeAndMass,{headers , params: params })
  }

  checkGeneticAlgRoute(planning:PlanningGenetic):  Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    let params = new HttpParams().set('deliveryDate', planning.deliveryDate).set('numGer', planning.numGer).set('dimPop', planning.dimPop).set('perC', planning.perC).set('perM', planning.perM).set('refVal', planning.refVal);
    
    return this.http.get<Warehouse[]>(environment.logisticsAPI + environment.logisticsAPIPlanningGeneticAlgRoute ,{headers ,params: params })
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
 
}