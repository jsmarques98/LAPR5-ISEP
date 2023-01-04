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
    autonomy: [0,Validators.required],
    maxBattery: [0,Validators.required],
    payLoad:[0,Validators.required],
    tare:[0,Validators.required],
    baterryChargingTime:[0,Validators.required],


  });

  truck = new Truck();

  constructor(private fb: FormBuilder,private router: Router, private service : TruckService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  async createTruck(){
    if(this.truckForm.valid){
    this.truck.plate=this.truckForm.value.plate!;
    this.truck.name=this.truckForm.value.name!;
    this.truck.autonomy=this.truckForm.value.autonomy!;
    this.truck.maxBattery=this.truckForm.value.maxBattery!;
    this.truck.payLoad=this.truckForm.value.payLoad!;
    this.truck.tare=this.truckForm.value.tare!;
    this.truck.baterryChargingTime=this.truckForm.value.baterryChargingTime!;
    this.truck.active="true";


    this.service.addTruck(this.truck).subscribe(
      (res) => {
        console.log(res);
        this.showNotification('Post Efetuado com sucesso!',false);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        this.showNotification('Post não efetuado!',true);
      }
    );
  }
  
}

private showNotification(mensagem: string, falha: boolean) {
  var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
  this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
}
}
