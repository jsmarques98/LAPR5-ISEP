import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Planning } from '../planning';
import { PlanningService } from '../planning.service';

@Component({
  selector: 'app-get-plannings',
  templateUrl: './get-plannings.component.html',
  styleUrls: ['./get-plannings.component.css']
})
export class GetPlanningsComponent implements OnInit {

  plannings = null;
  selectedPlanning?:Planning;

  constructor(private router: Router, private service : PlanningService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getPlannings(){ 
    
    
    return this.service.getPlannings().subscribe(
      (res) => {
        console.log((res));
        
        this.plannings = res.body;
      },
      (error) => {
        this.mostrarNotificacao("Erro ao obter os plannings!'",true);
      });



     
 
   
     
  }

  

 


  onSelect(planning: Planning): void {
    this.selectedPlanning = planning;
  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
