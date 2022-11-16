import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
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


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    PosLoginPageComponent,
    DeliveriesComponent,
    CreateDeliveriesComponent,
    PackagingsComponent,
    CreatePackagingsComponent
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
