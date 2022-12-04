import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouses';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-get-warehouses-by-id',
  templateUrl: './get-warehouses-by-id.component.html',
  styleUrls: ['./get-warehouses-by-id.component.css']
})
export class GetWarehousesByIdComponent implements OnInit {

  warehouse;

  warehouseForm = this.fb.group({
    id: [''],
  });
  visible ?: Warehouse;

  constructor(private fb: FormBuilder, private router: Router, private service : WarehouseService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getWarehouseById(){ 

    this.service.getWarehouseById(this.warehouseForm.value.id!).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazém obtido com sucesso!',false)
        this.warehouse = res;
        this.visible = this.warehouse;
      }else{
        this.mostrarNotificacao('Erro ao obter o armazém!',true)
      };
    });
  }

  deleteWarehouse(warehouseId : string){
    console.log(warehouseId);
    this.service.deleteWarehouse(warehouseId).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazém eliminado com sucesso!',false)
        this.visible=undefined;
        this.getWarehouseById();
       
      }else{
        this.mostrarNotificacao('Erro ao obter os Armazém!',true)
      };
    });
  }

  

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
