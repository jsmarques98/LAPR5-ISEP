import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-get-sections',
  templateUrl: './get-sections.component.html',
  styleUrls: ['./get-sections.component.css']
})
export class GetSectionsComponent implements OnInit {

  skip:number;
  limit:number;
  valueNext:number;
  limitNext:boolean;

  sections = null;

  selectedSection?: Section;
  constructor(private router: Router, private service : SectionService,private notification:MatSnackBar) { }

  ngOnInit(): void {
    this.skip=0
    this.limit=5 
    this.valueNext=0
    this.limitNext=false
  }



  getSections(){ 

    this.service.getSections(this.skip,this.limit).subscribe(res => {
      if (res.length!=0) {
        this.limitNext=false
        this.mostrarNotificacao('Secções obtidas com sucesso!',false)
        this.sections = res;
      }else{
        this.limitNext=true
        this.mostrarNotificacao('Já obteve todas as Secções!',true)
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

  back(){
    if(this.valueNext != 0){
      this.valueNext--
      this.skip-=this.limit;
      this.getSections()
    }
  }
  
  next(){
    if (!this.limitNext) {
      this.valueNext++
      this.skip = Number(this.limit) + Number(this.skip);
      this.getSections()
    }
  }
  
  updateLimit(e) {
      this.limit=e.target.value
      this.skip = 0
      this.getSections() 
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
