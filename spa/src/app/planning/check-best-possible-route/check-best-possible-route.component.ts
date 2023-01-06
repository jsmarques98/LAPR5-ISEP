import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Planning } from '../planning';
import { PlanningComponent } from '../planning.component';
import { PlanningService } from '../planning.service';
import {Warehouse} from '../../warehouses/warehouses'
import { Delivery } from 'src/app/deliveries/delivery';
import { DeliveryService } from 'src/app/deliveries/delivery.service';
import { TruckService } from 'src/app/trucks/truck.service';


@Component({
  selector: 'app-check-best-possible-route',
  templateUrl: './check-best-possible-route.component.html',
  styleUrls: ['./check-best-possible-route.component.css']
})
export class CheckBestPossibleRouteComponent implements OnInit {

  planningForm = this.fb.group({
    deliveryDate: ['']
  });

  planning = new Planning();

  deliveriesIDs;
  deliveries;
  custo;
  trucks;

  selectedDelivery?: Delivery;

  constructor(private fb: FormBuilder,private router: Router, private servicePlanning : PlanningService,private notification:MatSnackBar,private deliveryService : DeliveryService,private truckService : TruckService) {
    this.getAllTrucks()
   }

  ngOnInit(): void {
  }

  checkBestPossibleRoute(){ 
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)

    this.servicePlanning.checkBestPossibleRoute(this.planning).subscribe(res => {

      if (res != null && res.deliveryId!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
        this.deliveriesIDs = res.deliveryId;        
        this.custo=res.time + " min";

         const arr: string[] = [];
         for (let i = 0; i < this.deliveriesIDs.length; i++) {
          
          this.deliveryService.getDelivery(this.deliveriesIDs[i]).subscribe(res =>{
            if (res != null) {
              arr[i] = res;
            }else{
              console.log("Erro")
            };
          })
        }
        
        this.deliveries= arr;
      }else{
        this.deliveries=null;
        this.custo=null;
        this.mostrarNotificacao('Não existem entregas para o camião ou a data selecionadas!',true)
      };
    });


  }

  checkRouteHeuristicMass(){ 
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)

    this.servicePlanning.checkRouteHeuristicMass(this.planning).subscribe(res => {
      
      if (res != null && res.deliveryId!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
         this.deliveriesIDs = res.deliveryId;
         this.custo=res.time + " min";


         const arr: string[] = [];
         for (let i = 0; i < this.deliveriesIDs.length; i++) {
          
          this.deliveryService.getDelivery(this.deliveriesIDs[i]).subscribe(res =>{
            if (res != null) {
              arr[i] = res;
            }else{
              console.log("Erro")
            };
          })
        }
        this.deliveries= arr;
      }else{
        this.deliveries=null;
        this.custo=null;

        this.mostrarNotificacao('Não existem entregas para o camião ou a data selecionadas!',true)
      };
    });
  }

  checkRouteHeuristicTime(){ 
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)


    this.servicePlanning.checkRouteHeuristicTime(this.planning).subscribe(res => {
      if (res != null && res.deliveryId!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
         this.deliveriesIDs = res.deliveryId;
         this.custo=res.time + " min";


         const arr: string[] = [];
         for (let i = 0; i < this.deliveriesIDs.length; i++) {
          
          this.deliveryService.getDelivery(this.deliveriesIDs[i]).subscribe(res =>{
            if (res != null) {
              arr[i] = res;
            }else{
              console.log("Erro")
            };
          })
        }
        this.deliveries= arr;
      }else{
        this.deliveries=null;
        this.custo=null;

        this.mostrarNotificacao('Não existem entregas para o camião ou a data selecionadas!',true)
      };
    });
  }

  checkRouteHeuristicTimeAndMass(){ 
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)


    this.servicePlanning.checkRouteHeuristicTimeAndMass(this.planning).subscribe(res => {
      if (res != null && res.deliveryId!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
         this.deliveriesIDs = res.deliveryId;
         this.custo=res.time + " min";


         const arr: string[] = [];
         for (let i = 0; i < this.deliveriesIDs.length; i++) {
          
          this.deliveryService.getDelivery(this.deliveriesIDs[i]).subscribe(res =>{
            if (res != null) {
              arr[i] = res;
            }else{
              console.log("Erro")
            };
          })
        }
        this.deliveries= arr;
      }else{
        this.deliveries=null;
        this.custo=null;

        this.mostrarNotificacao('Não existem entregas para o camião ou a data selecionadas!',true)
      };
    });
    
  }

  getAllTrucks(){
    
    this.truckService.getTrucks().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazéns obtidos com sucesso!',false)
        
        this.trucks = res.body;
      }else{
        this.mostrarNotificacao('Erro ao obter os armazéns!',true)
      };

  });
}

updateTruck(e) {
  this.planning.truckName=e.target.value
}

onSelect(delivery: Delivery): void {
  this.selectedDelivery = delivery;
}


private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}

}
