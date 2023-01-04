import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouses';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-get-warehouses',
  templateUrl: './get-warehouses.component.html',
  styleUrls: ['./get-warehouses.component.css']
})
export class GetWarehousesComponent implements OnInit {

  p: number = 1;
  count: number = 5;

  warehouse;
  warehouses = null;
  selectedWarehouse?: Warehouse;

  constructor(private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getWarehouses(){ 

    this.service.getWarehouses().subscribe(res => {
      if (res != null) {
        this.showNotification('Armazéns obtidos com sucesso!',false)
        this.warehouses = res;
      }else{
        this.showNotification('Erro ao obter os armazéns!',true)
      };
    });
  }

  onSelect(warehouse: Warehouse): void {
    this.selectedWarehouse = warehouse;
  }


  deleteWarehouse(warehouseId : string){
    console.log(warehouseId);
    this.service.deleteWarehouse(warehouseId).subscribe(res => {
      if (res != null) {
        this.showNotification('Armazém eliminado com sucesso!',false)
        this.selectedWarehouse=undefined;
        this.getWarehouses();
       
      }else{
        this.showNotification('Erro ao obter o Armazém!',true)
      };
    });
  }

  inactivateWarehouse(warehouseId : string){
    console.log(warehouseId);
    this.service.inactivateWarehouse(warehouseId).subscribe(res => {
      if (res != null) {
        this.showNotification('Armazém inibido com sucesso!',false)
        this.selectedWarehouse=undefined;
        this.getWarehouses();
       
      }else{
        this.showNotification('Erro ao inibir o Armazém!',true)
      };
    });
  }

  activateWarehouse(warehouseId : string){
    console.log(warehouseId);
    this.service.activateWarehouse(warehouseId).subscribe(res => {
      if (res != null) {
        this.showNotification('Armazém ativado com sucesso!',false)
        
      }else{
        this.showNotification('Erro ao ativar o Armazém!',true)
      };
    });
  }

  private showNotification(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
