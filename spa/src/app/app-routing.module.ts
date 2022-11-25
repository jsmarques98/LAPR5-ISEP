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
import { CheckBestPossibleRouteComponent } from './planning/check-best-possible-route/check-best-possible-route.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PosLoginPageComponent },
  { path: 'createDeliveries', component: CreateDeliveriesComponent },
  { path: 'createPackagings', component: CreatePackagingsComponent },
  { path: 'updatePackagings', component: UpdatePackagingsComponent },
  { path: 'createTrucks', component: CreateTrucksComponent },
  { path: 'createSections', component: CreateSectionsComponent },
  { path: 'createWarehouses', component: CreateWarehousesComponent },
  { path: 'checkBestPossibleRoute', component: CheckBestPossibleRouteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
