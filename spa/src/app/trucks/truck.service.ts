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
 

   addTruck(truck: Truck) {
    
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization': 'Token ' + token, 'content-type': 'application/json'};
    const body = JSON.stringify(truck);
   return this.http.post(environment.logisticsAPI + environment.logisticsAPIPTrucks, body, {headers,observe:'response'});
  }

  getTrucks(): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
    return this.http.get<Truck[]>(environment.logisticsAPI+environment.logisticsAPIPTrucks,{headers,observe:'response'});
  }

  deleteTruck(plate : string): Observable<any> {
    const token = localStorage.getItem('id_token')!;
    let deleteOptions =  {headers: new HttpHeaders({'Authorization' : 'Token ' + token, 'Content-Type': 'application/json' }),
           body : {'Plate' : plate}     }
  
    return this.http.delete<any>(environment.logisticsAPI+environment.logisticsAPIPTrucks,deleteOptions);
  }

  inactiveTruck(plate : string): Observable<any> {
      const token = localStorage.getItem('id_token')!;
      let inactiveOptions =  {headers: new HttpHeaders({'Authorization' : 'Token ' + token, 'Content-Type': 'application/json' }), }
          
        return this.http.patch<any>(environment.logisticsAPI+environment.logisticsAPIInactiveTrucks, {'Plate' : plate}, inactiveOptions);

  }

  activateTruck(plate : string): Observable<any> {

      const token = localStorage.getItem('id_token')!;
      const headers = {'Authorization' : 'Token ' + token,'content-type': 'application/json'} 
      const body = {'Plate' : plate} 
    
        return this.http.patch(environment.logisticsAPI + environment.logisticsAPIActiveTrucks, body,{headers} );
  }
  
  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

 
}