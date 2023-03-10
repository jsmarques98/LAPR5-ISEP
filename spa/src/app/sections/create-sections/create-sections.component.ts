import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


    duration:['',Validators.required],
    distance:['',Validators.required],
    energySpent:['',Validators.required],
    extraTime:['',Validators.required],
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
    this.section.warehouseOrigin=e.target.value
  }
 
  updateWarehouseDestiny(e) {
    this.section.warehouseDestiny=e.target.value
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
    if(this.sectionForm.valid){
      this.section.duration=parseInt(this.sectionForm.value.duration!);
      this.section.distance=parseInt(this.sectionForm.value.distance!);
      this.section.energySpent=parseInt(this.sectionForm.value.energySpent!);
      this.section.extraTime=parseInt(this.sectionForm.value.extraTime!);
    
      this.service.addSection(this.section).subscribe( (res) => {
        this.mostrarNotificacao('Post Efetuado com sucesso!',false);
        this.router.navigate(['/home']);
      },
      (error) => {
        if(error.status==402){
          this.mostrarNotificacao(error.error,true);
        }
      else{
        this.mostrarNotificacao(error.error.errors.message,true);
      }
    });
  }
  
}

private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}

}
