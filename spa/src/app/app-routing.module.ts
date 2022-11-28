import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PosLoginPageComponent } from './pos-login-page/pos-login-page.component';
import { LoginComponent } from './login/login.component';
import { CreateDeliveriesComponent } from './deliveries/create-deliveries/create-deliveries.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePackagingsComponent } from './packagings/create-packagings/create-packagings.component';
import { UpdatePackagingsComponent } from './packagings/update-packagings/update-packagings.component';
import { CreateTrucksComponent } from './trucks/create-trucks/create-trucks.component';
import { CreateSectionsComponent } from './sections/create-sections/create-sections.component';
import { CreateWarehousesComponent } from './warehouses/create-warehouses/create-warehouses.component';
import { GetDeliveriesComponent } from './deliveries/get-deliveries/get-deliveries.component';
import { GetSectionsComponent } from './sections/get-sections/get-sections.component';
import { GetTrucksComponent } from './trucks/get-trucks/get-trucks.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PosLoginPageComponent },
  { path: 'createDeliveries', component: CreateDeliveriesComponent },
  { path: 'createPackagings', component: CreatePackagingsComponent },
  { path: 'updatePackagings', component: UpdatePackagingsComponent },
  { path: 'createTrucks', component: CreateTrucksComponent },
  { path: 'createSections', component: CreateSectionsComponent },
  { path: 'createWarehouses', component: CreateWarehousesComponent },
  { path: 'getDeliveries', component: GetDeliveriesComponent },
  { path: 'getSections', component: GetSectionsComponent },
  { path: 'getTrucks', component: GetTrucksComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
