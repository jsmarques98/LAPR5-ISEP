import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PosLoginPageComponent } from './pos-login-page/pos-login-page.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { CreateDeliveriesComponent } from './deliveries/create-deliveries/create-deliveries.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PackagingsComponent } from './packagings/packagings.component';
import { CreatePackagingsComponent } from './packagings/create-packagings/create-packagings.component';
import { UpdatePackagingsComponent } from './packagings/update-packagings/update-packagings.component';
import { TrucksComponent } from './trucks/trucks.component';
import { CreateTrucksComponent } from './trucks/create-trucks/create-trucks.component';
import { SectionsComponent } from './sections/sections.component';
import { CreateSectionsComponent } from './sections/create-sections/create-sections.component';
import { CreateWarehousesComponent } from './warehouses/create-warehouses/create-warehouses.component';
import { WarehousesComponent } from './warehouses/warehouses.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PosLoginPageComponent,
    DeliveriesComponent,
    CreateDeliveriesComponent,
    PackagingsComponent,
    CreatePackagingsComponent,
    TrucksComponent,
    CreateTrucksComponent,
    SectionsComponent,
    CreateSectionsComponent,
    UpdatePackagingsComponent,
    WarehousesComponent,
    CreateWarehousesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
