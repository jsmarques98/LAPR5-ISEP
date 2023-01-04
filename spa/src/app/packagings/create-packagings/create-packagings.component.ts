import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PackagingService } from '../packaging.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Packaging } from '../packaging';
import { DeliveryService } from 'src/app/deliveries/delivery.service';
import { TruckService } from 'src/app/trucks/truck.service';

@Component({
  selector: 'app-create-packagings',
  templateUrl: './create-packagings.component.html',
  styleUrls: ['./create-packagings.component.css']
})
export class CreatePackagingsComponent implements OnInit {
  
  packagingForm = this.fb.group({
    id: [''],

    packagingPositionX: [''],
    packagingPositionY: [''],
    packagingPositionZ:['']
  });

  deliveries
  trucks
  packaging = new Packaging();

  constructor(private fb: FormBuilder,private router: Router, private service : PackagingService,private deliveryService :
    DeliveryService,private truckService : TruckService,private notification:MatSnackBar) {
      this.getAllDeliveries()
      this.getAllTrucks()
    }

  ngOnInit(): void {
  }

  createPackaging(){
    
    this.packaging.id=this.packagingForm.value.id!;
    this.packaging.positionX=this.packagingForm.value.packagingPositionX!;
    this.packaging.positionY=this.packagingForm.value.packagingPositionY!;
    this.packaging.positionZ=this.packagingForm.value.packagingPositionZ!;

    this.service.addPackaging(this.packaging).subscribe(
      (res) => {
        this.mostrarNotificacao('Post Efetuado com sucesso!',false);
        this.router.navigate(['/home']);
      },
      (error) => {
        if(error.status==402){
          this.mostrarNotificacao(error.error,true);
        }
      else{
        this.mostrarNotificacao(error.error.errors.message,true);
      }
    });
  
}


updateDelivery(e) {
  this.packaging.deliveryId=e.target.value


}

getAllDeliveries(){
    
  this.deliveryService.getDeliveries().subscribe(res => {
    if (res != null) {
      this.mostrarNotificacao('Armazéns obtidos com sucesso!',false)
      this.deliveries = res;
    }else{
      this.mostrarNotificacao('Erro ao obter os armazéns!',true)
    };

  });
}

updateTruck(e) {
  this.packaging.truckPlate=e.target.value
}

getAllTrucks(){
    
  this.truckService.getTrucks().subscribe(res => {
    if (res != null) {
      this.mostrarNotificacao('Armazéns obtidos com sucesso!',false)
      this.trucks = res;
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