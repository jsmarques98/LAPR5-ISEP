import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-get-deliveries',
  templateUrl: './get-deliveries.component.html',
  styleUrls: ['./get-deliveries.component.css']
})
export class GetDeliveriesComponent implements OnInit {

  skip:number;
  limit:number;
  valueNext:number;
  limitNext:boolean;

  deliveries = null;
  selectedDelivery?: Delivery;

  constructor(private router: Router, private service : DeliveryService,private notification:MatSnackBar) { }

  ngOnInit(): void {
    this.skip=0
    this.limit=5 
    this.valueNext=0
    this.limitNext=false
  }

  getDeliveries(){ 

    this.service.getDeliveriesLimit(this.skip,this.limit).subscribe(res => {
      if (res.length!=0) {
        this.limitNext=false
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false)
        this.deliveries = res;
      }else{
        this.limitNext=true
        this.skip-=this.limit;
        this.mostrarNotificacao('Já obteve todas as entregas!',true)
      };
    });
  }

  onSelect(delivery: Delivery): void {
    this.selectedDelivery = delivery;
  }
  
  deleteDeliverie(deliveryId : string){
    
    this.service.deleteDeliverie(deliveryId).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('delivery eliminado com sucesso!',false)
        this.selectedDelivery=undefined;
        this.getDeliveries();
       
      }else{
        this.mostrarNotificacao('Erro ao eliminar delivery!',true)
      };
    });
  }

  back(){
    if(this.valueNext != 0){
      this.valueNext--
      this.skip-=this.limit;
      this.getDeliveries()
    }
  }
  
  next(){
    if (!this.limitNext) {
      this.valueNext++
      this.skip = Number(this.limit) + Number(this.skip);
      this.getDeliveries()
    }
  }
  
  updateLimit(e) {
      this.limit=e.target.value
      this.skip = 0
      this.getDeliveries() 
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
