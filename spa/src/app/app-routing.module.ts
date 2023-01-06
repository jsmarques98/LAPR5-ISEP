import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PosLoginPageComponent } from './pos-login-page/pos-login-page.component';
import { LoginComponent } from './user/login/login.component';
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
import { GetWarehousesComponent } from './warehouses/get-warehouses/get-warehouses.component';
import { CheckBestPossibleRouteComponent } from './planning/check-best-possible-route/check-best-possible-route.component';
import { UpdateWarehousesComponent } from './warehouses/update-warehouses/update-warehouses.component';
import { GetWarehousesByIdComponent } from './warehouses/get-warehouses-by-id/get-warehouses-by-id.component';
import { GetPackagingsComponent } from './packagings/get-packagings/get-packagings.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { RgpdTermsComponent } from './user/rgpd-terms/rgpd-terms.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdateUserInfoComponent } from './user/update-user-info/update-user-info.component';
import { RouteGeneticAlgorithmComponent } from './planning/route-genetic-algorithm/route-genetic-algorithm.component';



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
  { path: 'getTrucks', component: GetTrucksComponent },
  { path: 'getWarehouses', component: GetWarehousesComponent },
  { path: 'checkBestRoute', component: CheckBestPossibleRouteComponent },
  { path: 'updateWarehouses', component: UpdateWarehousesComponent },
  { path: 'getWarehousesById', component: GetWarehousesByIdComponent },
  { path: 'getPackagings', component: GetPackagingsComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'rgpdTerms', component: RgpdTermsComponent },
  { path: 'deleteUser', component: DeleteUserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateUserInfo', component: UpdateUserInfoComponent },
  { path: 'geneticAlg', component: RouteGeneticAlgorithmComponent },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
