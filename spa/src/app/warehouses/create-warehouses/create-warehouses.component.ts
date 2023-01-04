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
    warehouseDoorNumber: ['',Validators.required],
    warehousePostCode:['',Validators.required],
    warehouseCity: ['',Validators.required],
    warehouseLatitude: ['',Validators.required],
    warehouseLongitude: ['',Validators.required],
    warehouseAltitude: ['',Validators.required],    
  });

  warehouse = new Warehouse();

  constructor(private fb: FormBuilder,private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  createWarehouse(){
    
    this.warehouse.id=this.warehouseForm.value.id!;
    this.warehouse.designation=this.warehouseForm.value.warehouseDesignation!;
    this.warehouse.street=this.warehouseForm.value.warehouseStreet!;
    this.warehouse.doorNumber=parseInt(this.warehouseForm.value.warehouseDoorNumber!);
    this.warehouse.postCode=this.warehouseForm.value.warehousePostCode!;
    this.warehouse.city=this.warehouseForm.value.warehouseCity!;
    this.warehouse.latitude=parseInt(this.warehouseForm.value.warehouseLatitude!);
    this.warehouse.longitude=parseInt(this.warehouseForm.value.warehouseLongitude!);
    this.warehouse.altitude=parseInt(this.warehouseForm.value.warehouseAltitude!);
    this.warehouse.active="true";


    
    this.service.addWarehouse(this.warehouse).subscribe(
      (res) => {
        this.showNotification('Post Efetuado com sucesso!',false);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.showNotification("Post Efetuado sem sucesso!",true);
      });
}

private showNotification(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}