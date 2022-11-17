import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-create-sections',
  templateUrl: './create-sections.component.html',
  styleUrls: ['./create-sections.component.css']
})
export class CreateSectionsComponent implements OnInit {

  sectionForm = this.fb.group({
    id:[''],
    warehouseOrigin:[''],
    warehouseDestiny:[''],
    duration:[],
    distance:[],
    energySpent:[],
    extraTime:[]
  });

  section = new Section();

  constructor(private fb: FormBuilder,private router: Router, private service : SectionService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  createSection(){
    
    this.section.id=this.sectionForm.value.id!;
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
