import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseService } from '../warehouse.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Warehouse } from '../warehouses';

@Component({
  selector: 'app-update-warehouses',
  templateUrl: './update-warehouses.component.html',
  styleUrls: ['./update-warehouses.component.css']
})
export class UpdateWarehousesComponent implements OnInit {

  warehouseForm = this.fb.group({
    id: [''],
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


  updateWarehouse(){
    
    this.warehouse.id=this.warehouseForm.value.id!;
    this.warehouse.designation=this.warehouseForm.value.warehouseDesignation!;
    this.warehouse.street=this.warehouseForm.value.warehouseStreet!;
    this.warehouse.doorNumber=this.warehouseForm.value.warehouseDoorNumber!;
    this.warehouse.postCode=this.warehouseForm.value.warehousePostCode!;
    this.warehouse.city=this.warehouseForm.value.warehouseCity!;
    this.warehouse.latitude=this.warehouseForm.value.warehouseLatitude!;
    this.warehouse.longitude=this.warehouseForm.value.warehouseLongitude!;
    this.warehouse.altitude=this.warehouseForm.value.warehouseAltitude!;

    this.service.updateWarehouse(this.warehouse).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazém alterado com sucesso!',false)
      }else{
        this.mostrarNotificacao('Erro ao alterar o armazém!',true)
      };

    this.router.navigate(['/home']);
  });
  
}

private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}
