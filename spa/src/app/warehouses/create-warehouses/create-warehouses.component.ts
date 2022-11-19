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
    Id: [''],
    warehouseDesignation: [''],
    warehouseStreet: [],
    warehouseDoorNumber: [],
    warehousePostCode:[],
    warehouseCity: [],
    warehouseLatitude: [],
    warehouseLongitude: [],
    warehouseAltitude: []
  });

  warehouse = new Warehouse();

  constructor(private fb: FormBuilder,private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  createWarehouse(){
    
    this.warehouse.Id=this.warehouseForm.value.Id!;
    this.warehouse.Designation=this.warehouseForm.value.warehouseDesignation!;
    this.warehouse.Street=this.warehouseForm.value.warehouseStreet!;
    this.warehouse.DoorNumber=this.warehouseForm.value.warehouseDoorNumber!;
    this.warehouse.PostCode=this.warehouseForm.value.warehousePostCode!;
    this.warehouse.City=this.warehouseForm.value.warehouseCity!;
    this.warehouse.Latitude=this.warehouseForm.value.warehouseLatitude!;
    this.warehouse.Longitude=this.warehouseForm.value.warehouseLongitude!;
    this.warehouse.Altitude=this.warehouseForm.value.warehouseAltitude!;

    
    this.service.addWarehouse(this.warehouse).subscribe(res => {
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