import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PackagingService } from '../packaging.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Packaging } from '../packaging';

@Component({
  selector: 'app-create-packagings',
  templateUrl: './create-packagings.component.html',
  styleUrls: ['./create-packagings.component.css']
})
export class CreatePackagingsComponent implements OnInit {
  
  packagingForm = this.fb.group({
    id: [''],
    packagingDeliveryId: [''],
    packagingTruckId: [''],
    packagingPositionX: [''],
    packagingPositionY: [''],
    packagingPositionZ:['']
  });

  packaging = new Packaging();

  constructor(private fb: FormBuilder,private router: Router, private service : PackagingService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  createPackaging(){
    
    this.packaging.id=this.packagingForm.value.id!;
    this.packaging.positionX=this.packagingForm.value.packagingPositionX!;
    this.packaging.positionY=this.packagingForm.value.packagingPositionY!;
    this.packaging.positionZ=this.packagingForm.value.packagingPositionZ!;
    this.packaging.truckId=this.packagingForm.value.packagingTruckId!;
    this.packaging.deliveryId=this.packagingForm.value.packagingDeliveryId!;



    

    this.service.addPackaging(this.packaging).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Empacotamento criado com sucesso!',false)
      }else{
        this.mostrarNotificacao('Erro ao criar empacotamento!',true)
      };

    this.router.navigate(['/home']);
  });
  
}

private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}