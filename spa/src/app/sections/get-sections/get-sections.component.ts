import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-get-sections',
  templateUrl: './get-sections.component.html',
  styleUrls: ['./get-sections.component.css']
})
export class GetSectionsComponent implements OnInit {

  sections = null;

  selectedSection?: Section;
  constructor(private router: Router, private service : SectionService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }



  getSections(){ 

    this.service.getSections().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Secções obtidas com sucesso!',false)
        this.sections = res;
      }else{
        this.mostrarNotificacao('Erro ao obter as Secções!',true)
      };
    });
  }

  onSelect(section: Section): void {
    this.selectedSection = section;
  }

  deleteSection(sectionId:string){

    this.service.deleteSection(sectionId).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('section eliminada com sucesso!',false)
        this.selectedSection=undefined;
        this.getSections();
       
      }else{
        this.mostrarNotificacao('Erro ao eliminar uma section!',true)
      };
    });
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
