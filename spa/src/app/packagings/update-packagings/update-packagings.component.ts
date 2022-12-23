import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PackagingService } from '../packaging.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Packaging } from '../packaging';

@Component({
  selector: 'app-update-packagings',
  templateUrl: './update-packagings.component.html',
  styleUrls: ['./update-packagings.component.css']
})
export class UpdatePackagingsComponent implements OnInit {
  packagingForm = this.fb.group({
    id: [''],
    packagingDeliveryId: [''],
    packagingTruckPlate: [''],
    packagingPositionX: [''],
    packagingPositionY: [''],
    packagingPositionZ:['']
  });

  packaging = new Packaging();

  constructor(private fb: FormBuilder,private router: Router, private service : PackagingService,private notification:MatSnackBar) { }


  ngOnInit(): void {
  }


  updatePackaging(){
    
    this.packaging.id=this.packagingForm.value.id!;
    this.packaging.positionX=this.packagingForm.value.packagingPositionX!;
    this.packaging.positionY=this.packagingForm.value.packagingPositionY!;
    this.packaging.positionZ=this.packagingForm.value.packagingPositionZ!;
    this.packaging.truckPlate=this.packagingForm.value.packagingTruckPlate!;
    this.packaging.deliveryId=this.packagingForm.value.packagingDeliveryId!;

    this.service.updatePackaging(this.packaging).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Empacotamento alterado com sucesso!',false)
      }else{
        this.mostrarNotificacao('Erro ao alterar o  empacotamento!',true)
      };

    this.router.navigate(['/home']);
  });
  
}

private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}
