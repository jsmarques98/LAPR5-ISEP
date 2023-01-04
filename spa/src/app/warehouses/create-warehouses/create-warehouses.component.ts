import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouses';
import { WarehouseService } from '../warehouse.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-warehouses',
  templateUrl: './create-warehouses.component.html',
  styleUrls: ['./create-warehouses.component.css']
})
export class CreateWarehousesComponent implements OnInit {

  warehouseForm = this.fb.group({
    id: ['',Validators.required],
    warehouseDesignation: ['',Validators.required],
    warehouseStreet: ['',Validators.required],
    warehouseDoorNumber: [0,Validators.required],
    warehousePostCode:['',Validators.required],
    warehouseCity: ['',Validators.required],
    warehouseLatitude: [0,Validators.required],
    warehouseLongitude: [0,Validators.required],
    warehouseAltitude: [0,Validators.required],
    warehouseActive: ['',Validators.required],    
  });

  warehouse = new Warehouse();

  constructor(private fb: FormBuilder,private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  createWarehouse(){
    
    this.warehouse.id=this.warehouseForm.value.id!;
    this.warehouse.designation=this.warehouseForm.value.warehouseDesignation!;
    this.warehouse.street=this.warehouseForm.value.warehouseStreet!;
    this.warehouse.doorNumber=this.warehouseForm.value.warehouseDoorNumber!;
    this.warehouse.postCode=this.warehouseForm.value.warehousePostCode!;
    this.warehouse.city=this.warehouseForm.value.warehouseCity!;
    this.warehouse.latitude=this.warehouseForm.value.warehouseLatitude!;
    this.warehouse.longitude=this.warehouseForm.value.warehouseLongitude!;
    this.warehouse.altitude=this.warehouseForm.value.warehouseAltitude!;
    this.warehouse.active=this.warehouseForm.value.warehouseActive!;


    
    this.service.addWarehouse(this.warehouse).subscribe(
      (res) => {
        console.log(res);
        this.showNotification('Post Efetuado com sucesso!',false);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        this.showNotification('Post não efetuado!',true);
      }
    );
}

private showNotification(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}