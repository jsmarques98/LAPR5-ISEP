import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Delivery } from 'src/app/deliveries/delivery';
import { DeliveryService } from 'src/app/deliveries/delivery.service';
import { PlanningService } from '../planning.service';
import { PlanningGenetic } from './planningGenetic';

@Component({
  selector: 'app-route-genetic-algorithm',
  templateUrl: './route-genetic-algorithm.component.html',
  styleUrls: ['./route-genetic-algorithm.component.css']
})
export class RouteGeneticAlgorithmComponent implements OnInit {

  planningForm = this.fb.group({
    deliveryDate: [''],
    numGer: [],
    dimPop: [],
    perC: [],
    perM: [],
    refVal: [],
  });

  planningGenetic = new PlanningGenetic();
  deliveriesIDs;
  deliveries;
  selectedDelivery?: Delivery;
  planningsList;
  trucks;


  constructor(private fb: FormBuilder,private router: Router, private servicePlanning : PlanningService,private notification:MatSnackBar,private deliveryService : DeliveryService) { }

  ngOnInit(): void {

  }

  checkRouteGenetic(){
    this.planningGenetic.deliveryDate=this.planningForm.value.deliveryDate!;
    this.planningGenetic.deliveryDate= this.planningGenetic.deliveryDate.substring(8,10)+"/"+this.planningGenetic.deliveryDate.substring(5,7)+"/"+this.planningGenetic.deliveryDate.substring(0,4)
    this.planningGenetic.numGer= this.planningForm.value.numGer!
    this.planningGenetic.dimPop= this.planningForm.value.dimPop!
    this.planningGenetic.perC= this.planningForm.value.perC!
    this.planningGenetic.perM= this.planningForm.value.perM!
    this.planningGenetic.refVal= this.planningForm.value.refVal!
    this.deliveriesIDs = [];
    this.trucks = [];

    this.servicePlanning.checkGeneticAlgRoute(this.planningGenetic).subscribe(res => {
      
      if (res != null && res.routeList!=undefined) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false);
        this.planningsList = res.routeList;
        this.deliveries=[]

        let aux=0;
        for(let i =0;i<this.planningsList.length;i++){
          if(i%2==0){
            this.deliveriesIDs[aux]=this.planningsList[i]
            aux++;
          }else{
            this.trucks.push(this.planningsList[i])
          }
        }

        

        

        let listAux=[];   
        for(let j = 0 ; j<this.deliveriesIDs.length;j++){
          
          listAux= this.deliveriesIDs[j];
          let size = listAux.length;
          this.deliveries[j]=[];
          for (let i = 0; i < size; i++) {
            this.deliveryService.getDelivery(listAux[i]).subscribe(res =>{
             this.deliveries[j].push(res);
            })
          }
        }
         
                
      }else{
        this.deliveries=null;
        this.mostrarNotificacao('Não existem entregas para o camião ou a data selecionadas!',true)
      };
    })
    
    
    }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

  onSelect(delivery: Delivery): void {
    this.selectedDelivery = delivery;
  }

}
