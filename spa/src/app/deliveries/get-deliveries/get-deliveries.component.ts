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

  deliveries = null;
  selectedDelivery?: Delivery;

  constructor(private router: Router, private service : DeliveryService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getDeliveries(){ 

    this.service.getDeliveries().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false)
        this.deliveries = res;
      }else{
        this.mostrarNotificacao('Erro ao obter as entregas!',true)
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


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
