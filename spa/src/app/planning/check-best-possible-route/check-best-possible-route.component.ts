import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Planning } from '../planning';
import { PlanningComponent } from '../planning.component';
import { PlanningService } from '../planning.service';

@Component({
  selector: 'app-check-best-possible-route',
  templateUrl: './check-best-possible-route.component.html',
  styleUrls: ['./check-best-possible-route.component.css']
})
export class CheckBestPossibleRouteComponent implements OnInit {

  planningForm = this.fb.group({
    truckPlate: [''],
    deliveryDate: [''],
  });

  planning = new Planning();

  constructor(private fb: FormBuilder,private router: Router, private service : PlanningService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  checkBestPossibleRoute(){
    this.planning.truckPlate=this.planningForm.value.truckPlate!;
    this.planning.deliveryDate=this.planningForm.value.deliveryDate!;

    const strNum = this.planning.deliveryDate.replace(/[^0-9]/g, '')
    this.planning.deliveryDate= strNum;

    this.service.checkBestPossibleRoute(this.planning).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Empacotamento criado com sucesso!',false)
        console.log(res);
      }else{
        this.mostrarNotificacao('Erro ao criar empacotamento!',true)
      };
  });
}


private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}

}
