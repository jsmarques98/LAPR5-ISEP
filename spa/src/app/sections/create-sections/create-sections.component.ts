import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/warehouses/warehouse.service';
import { Section } from '../section';
import { Warehouse } from 'src/app/warehouses/warehouses';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-create-sections',
  templateUrl: './create-sections.component.html',
  styleUrls: ['./create-sections.component.css']
})
export class CreateSectionsComponent implements OnInit {

  sectionForm = this.fb.group({

    warehouseOrigin:[''],
    warehouseDestiny:[''],
    duration:[],
    distance:[],
    energySpent:[],
    extraTime:[],
  });

  
  warehouses;
  section = new Section();

  constructor(private fb: FormBuilder,private router: Router, private service : SectionService,private servieWarehouse: WarehouseService,private notification:MatSnackBar) {
    this.getAllWarehouses()
   }

  ngOnInit(): void {
  }

  
  public allCustomers: string[] = new Array();

  updateWarehouseOrigin(e) {
    this.sectionForm.value.warehouseOrigin=e.target.value
  }
 
  updateWarehouseDestiny(e) {
    this.sectionForm.value.warehouseDestiny=e.target.value
  }

  getAllWarehouses(){
    
    this.servieWarehouse.getWarehouses().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Armazéns obtidos com sucesso!',false)
        this.warehouses = res;
      }else{
        this.mostrarNotificacao('Erro ao obter os armazéns!',true)
      };

  });
  
}


  createSection(){
    this.section.warehouseOrigin=this.sectionForm.value.warehouseOrigin!;
    this.section.warehouseDestiny=this.sectionForm.value.warehouseDestiny!;
    this.section.duration=this.sectionForm.value.duration!;
    this.section.distance=this.sectionForm.value.distance!;
    this.section.energySpent=this.sectionForm.value.energySpent!;
    this.section.extraTime=this.sectionForm.value.extraTime!;
   
    this.service.addSection(this.section).subscribe(res => {
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
