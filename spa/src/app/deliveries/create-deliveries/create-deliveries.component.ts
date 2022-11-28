import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-deliveries',
  templateUrl: './create-deliveries.component.html',
  styleUrls: ['./create-deliveries.component.css']
})
export class CreateDeliveriesComponent implements OnInit {
  
  deliveryForm = this.fb.group({
    id: [''],
    deliveryWarehouseId: [''],
    deliveryDate: [''],
    deliveryLoadTime: [],
    deliveryUnoadTime: [],
    deliveryTotalWeight:[]
  });

  delivery = new Delivery();

  constructor(private fb: FormBuilder,private router: Router, private service : DeliveryService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  createDelivery(){
    
    this.delivery.id=this.deliveryForm.value.id!;
    this.delivery.deliveryDate=this.deliveryForm.value.deliveryDate!;
    this.delivery.deliveryWarehouseId=this.deliveryForm.value.deliveryWarehouseId!;
    this.delivery.loadTime=this.deliveryForm.value.deliveryLoadTime!;
    this.delivery.unloadTime=this.deliveryForm.value.deliveryUnoadTime!;
    this.delivery.totalWeight=this.deliveryForm.value.deliveryTotalWeight!;

    const strNum = this.delivery.deliveryDate.replace(/[^0-9]/g, '')
    this.delivery.deliveryDate= strNum;

    this.service.addDelivery(this.delivery).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Post Efetuado com sucesso!',false)
      }else{
        this.mostrarNotificacao('Post não efetuado!',true)
      };

    this.router.navigate(['/home']);
  });
  
}

private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}

