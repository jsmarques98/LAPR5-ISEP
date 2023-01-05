import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Truck } from '../truck';
import { TruckService } from '../truck.service';
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-trucks',
  templateUrl: './create-trucks.component.html',
  styleUrls: ['./create-trucks.component.css']
})
export class CreateTrucksComponent implements OnInit {

  truckForm = this.fb.group({

    plate: ['',Validators.required],
    name: ['',Validators.required],
    autonomy: ['',Validators.required],
    maxBattery: ['',Validators.required],
    payLoad:['',Validators.required ],
    tare:['',Validators.required],

    baterryChargingTime:['',Validators.required],


  });

  truck = new Truck();

  constructor(private fb: FormBuilder,private router: Router, private service : TruckService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  async createTruck(){

    if(this.truckForm.valid){
    this.truck.plate=this.truckForm.value.plate!;
    this.truck.name=this.truckForm.value.name!;parseInt(this.truckForm.value.autonomy!)
    this.truck.autonomy=parseInt(this.truckForm.value.autonomy!)
    this.truck.maxBattery=parseInt(this.truckForm.value.maxBattery!)
    this.truck.payLoad=parseInt(this.truckForm.value.payLoad!)
    this.truck.tare=parseInt(this.truckForm.value.tare!)
    this.truck.baterryChargingTime=parseInt(this.truckForm.value.baterryChargingTime!)
    this.truck.active="true";


    (await this.service.addTruck(this.truck)).subscribe((res) => {
        if(res.status==201){
          this.mostrarNotificacao('Post Efetuado com sucesso!',false);
          this.router.navigate(['/home']);
        
        }
      
    },
    (error) => {
      if(error.status==402){
        this.mostrarNotificacao(error.error,true);
      }
    else{
      this.mostrarNotificacao(error.error.errors.message,true);
    }
    }
  );
  }
}
      





private mostrarNotificacao(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}
