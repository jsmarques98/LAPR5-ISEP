import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UpdateWarehousesComponent } from './update-warehouses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';


/*describe('UpdateWarehousesComponent', () => {
  let component: UpdateWarehousesComponent;
  let fixture: ComponentFixture<UpdateWarehousesComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let warehouseServiceSpy: jasmine.SpyObj<WarehouseService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let warehouse: Warehouse;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    warehouseServiceSpy = jasmine.createSpyObj('WarehouseService', ['updateWarehouse']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ UpdateWarehousesComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: WarehouseService, useValue: warehouseServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    })
    .compileComponents();
  }));

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: Router, useClass: class { navigateByUrl = jasmine.createSpy("navigateByUrl"); } },
        { provide: WarehouseService, useClass: class { updateWarehouse = jasmine.createSpy("updateWarehouse").and.returnValue(of(warehouse)); } },
        { provide: MatSnackBar, useClass: class { open = jasmine.createSpy("open"); } }
      ]
    })
    fixture = TestBed.createComponent(UpdateWarehousesComponent);
    component = fixture.componentInstance;
    let warehouse: Warehouse = {
      id: '1',
      designation: 'Warehouse 1',
      street: 'Street 1',
      doorNumber: 1,
      postCode: '0000',
      city: 'City 1',
      latitude: 0,
      longitude: 0,
      altitude: 0,
      active: 'true'
    };
    
 

  it('should update warehouse and navigate to home route', () => {
    warehouseServiceSpy.updateWarehouse.and.returnValue(of(warehouse));
    component.updateWarehouse();
    expect(warehouseServiceSpy.updateWarehouse).toHaveBeenCalledWith(warehouse);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should display error notification on update failure', () => {
    warehouseServiceSpy.updateWarehouse.and.returnValue(of(null));
    component.updateWarehouse()
  });
})
}) */

/*describe('UpdateWarehousesComponent', () => {
  let component: UpdateWarehousesComponent;
  let fixture: ComponentFixture<UpdateWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWarehousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/