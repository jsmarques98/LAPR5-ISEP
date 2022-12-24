import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Truck } from '../truck';
import { TruckService } from '../truck.service';

@Component({
  selector: 'app-get-trucks',
  templateUrl: './get-trucks.component.html',
  styleUrls: ['./get-trucks.component.css']
})
export class GetTrucksComponent implements OnInit {

  trucks = null;
  selectedTruck?:Truck;

  constructor(private router: Router, private service : TruckService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getTrucks(){ 

    this.service.getTrucks().subscribe(res => {
      if (res != null) {
     
        this.trucks = res;
      }else{
        this.mostrarNotificacao('Erro ao obter os Trucks!',true)
      };
    });
  }

  deleteTruck(plate:string){

    this.service.deleteTruck(plate).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Trucks eliminado com sucesso!',false)
        this.selectedTruck=undefined;
        this.getTrucks();
       
      }else{
        this.mostrarNotificacao('Erro ao obter os Trucks!',true)
      };
    });
  }

  inactiveTruck(plate:string){
    try{
    this.service.inactiveTruck(plate).subscribe(async res =>{
      this.mostrarNotificacao(res,true)
      this.getTrucks();
    })
    } catch{
      
    }
  }


  onSelect(truck: Truck): void {
    this.selectedTruck = truck;
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
