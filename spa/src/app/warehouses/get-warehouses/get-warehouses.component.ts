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

  warehouse;
  warehouses = null;
  selectedWarehouse?: Warehouse;

  constructor(private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getWarehouses(){ 

    this.service.getWarehouses().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazéns obtidos com sucesso!',false)
        this.warehouses = res;
      }else{
        this.mostrarNotificacao('Erro ao obter os armazéns!',true)
      };
    });
  }

  onSelect(warehouse: Warehouse): void {
    this.selectedWarehouse = warehouse;
  }


  deleteWarehouse(warehouseId : string){
    this.service.deleteWarehouse(warehouseId)
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
