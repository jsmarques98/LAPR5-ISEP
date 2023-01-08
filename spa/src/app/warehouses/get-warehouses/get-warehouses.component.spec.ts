import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  

import { GetWarehousesComponent } from './get-warehouses.component';
import { WarehouseService } from '../warehouse.service';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs/internal/Observable';

describe('GetWarehousesComponent', () => {
  let component: GetWarehousesComponent;
  let fixture: ComponentFixture<GetWarehousesComponent>;
  let fakeWarehouseService: any;

  const mockSnackBar = {
    open: (message: string, action: string, config) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWarehousesComponent ],
      imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
      providers: [WarehouseService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
    }).compileComponents();

    fakeWarehouseService = jasmine.createSpyObj('WarehouseService', ['getWarehouses']);
    fixture = TestBed.createComponent(GetWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should get', () => {
    expect(component).toBeTruthy();
  });



  it('get all warehouses', async () => {
    const response = new Observable((observer) => {
      observer.next([]);
      observer.complete();
    });
    fakeWarehouseService.getWarehouses.and.returnValue(response);

    // Call the component's getWarehouses method and save the returned value
    const result = component.getWarehouses();

    // Verify that the component's getWarehouses method returned the correct value
    expect(result).toBeTruthy(response);
  });

});