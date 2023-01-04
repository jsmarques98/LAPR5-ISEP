import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { WarehouseService } from 'src/app/warehouses/warehouse.service';

@Component({
  selector: 'app-create-deliveries',
  templateUrl: './create-deliveries.component.html',
  styleUrls: ['./create-deliveries.component.css']
})
export class CreateDeliveriesComponent implements OnInit {
  
  deliveryForm = this.fb.group({
    id: [''],
    deliveryDate: [''],
    deliveryLoadTime: [],
    deliveryUnoadTime: [],
    deliveryTotalWeight:[]
  });

  delivery = new Delivery();
  warehouses;
  constructor(private fb: FormBuilder,private router: Router, private service : DeliveryService,private servieWarehouse: WarehouseService,private notification:MatSnackBar) { 
    this.getAllWarehouses()
  }

  ngOnInit(): void {
  }

  createDelivery(){
    
    this.delivery.id=this.deliveryForm.value.id!;
    this.delivery.deliveryDate=this.deliveryForm.value.deliveryDate!;
    this.delivery.loadTime=this.deliveryForm.value.deliveryLoadTime!;
    this.delivery.unloadTime=this.deliveryForm.value.deliveryUnoadTime!;
    this.delivery.totalWeight=this.deliveryForm.value.deliveryTotalWeight!;
    const strNum = this.delivery.deliveryDate.replace(/[^0-9]/g, '')
    this.delivery.deliveryDate= strNum;
    this.service.addDelivery(this.delivery).subscribe(
      (res) => {
        this.mostrarNotificacao('Delivery criada com sucesso!',false);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.mostrarNotificacao("Erro ao criar Delivery !",true);
      });
  
  }

  updateWarehouse(e) {
    this.delivery.deliveryWarehouseId=e.target.value
  }

  getAllWarehouses(){
      
    this.servieWarehouse.getWarehouses().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazéns obtidos com sucesso!',false)
        this.warehouses = res;
      }else{
        this.mostrarNotificacao('Erro ao obter os armazéns!',true)
      };

    });
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
}

