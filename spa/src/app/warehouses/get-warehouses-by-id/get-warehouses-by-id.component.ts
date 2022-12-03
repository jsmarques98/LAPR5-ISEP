import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouses';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-get-warehouses-by-id',
  templateUrl: './get-warehouses-by-id.component.html',
  styleUrls: ['./get-warehouses-by-id.component.css']
})
export class GetWarehousesComponent implements OnInit {

  warehouse;
  selectedWarehouse?: Warehouse;

  constructor(private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getWarehouseById(warehouseId: String){ 

    this.service.getWarehouseById(warehouseId).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazém obtido com sucesso!',false)
        this.warehouse = res;
      }else{
        this.mostrarNotificacao('Erro ao obter o armazém!',true)
      };
    });
  }

  
  onSelect(warehouse: Warehouse): void {
    this.selectedWarehouse = warehouse;
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
