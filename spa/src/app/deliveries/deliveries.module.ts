import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { CreateDeliveriesComponent } from './create-deliveries/create-deliveries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    DeliveriesComponent,
    CreateDeliveriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ]
})
export class DeliveriesModule { }
