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


@Component({
  selector: 'app-check-best-possible-route',
  templateUrl: './check-best-possible-route.component.html',
  styleUrls: ['./check-best-possible-route.component.css']
})
export class CheckBestPossibleRouteComponent implements OnInit {

  planningForm = this.fb.group({
    truckName: [''],
    deliveryDate: [''],
  });

  planning = new Planning();

  deliveriesIDs;
  deliveries;
  custo;

  selectedDelivery?: Delivery;

  constructor(private fb: FormBuilder,private router: Router, private servicePlanning : PlanningService,private notification:MatSnackBar,private deliveryService : DeliveryService) { }

  ngOnInit(): void {
  }

  checkBestPossibleRoute(){ 
    this.planning.truckName=this.planningForm.value.truckName!;
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;

   
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)


    this.servicePlanning.checkBestPossibleRoute(this.planning).subscribe(res => {
      
      if (res != null && res.routeList!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
        this.deliveriesIDs = res.routeList[0];
        this.custo=res.routeList[1] + " min";

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
    this.planning.truckName=this.planningForm.value.truckName!;
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)


    this.servicePlanning.checkRouteHeuristicMass(this.planning).subscribe(res => {
      if (res != null && res.routeList!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
         this.deliveriesIDs = res.routeList[0];
         this.custo=res.routeList[1] + " min";


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
    this.planning.truckName=this.planningForm.value.truckName!;
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)


    this.servicePlanning.checkRouteHeuristicTime(this.planning).subscribe(res => {
      if (res != null && res.routeList!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
         this.deliveriesIDs = res.routeList[0];
         this.custo=res.routeList[1] + " min";


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
    this.planning.truckName=this.planningForm.value.truckName!;
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planning.deliveryDate= this.planning.deliveryDate.substring(8,10)+"/"+this.planning.deliveryDate.substring(5,7)+"/"+this.planning.deliveryDate.substring(0,4)


    this.servicePlanning.checkRouteHeuristicTimeAndMass(this.planning).subscribe(res => {
      if (res != null && res.routeList!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
         this.deliveriesIDs = res.routeList[0];
         this.custo=res.routeList[1] + " min";


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

onSelect(delivery: Delivery): void {
  this.selectedDelivery = delivery;
}


private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}

}
