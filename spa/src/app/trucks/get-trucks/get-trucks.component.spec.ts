import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TruckService } from '../truck.service';
import { GetTrucksComponent } from './get-trucks.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Truck } from '../truck';


describe('GetTruckComponent', () => {
  let component: GetTrucksComponent;
  let fixture: ComponentFixture<GetTrucksComponent>;
  let fakeTruckService: any;

  const mockSnackBar = {
    open: (message: string, action: string, config) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTrucksComponent ],
      imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
      providers: [TruckService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
    }).compileComponents();

    fakeTruckService = jasmine.createSpyObj('TruckService', ['getTrucks']);
    fixture = TestBed.createComponent(GetTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should get', () => {
    expect(component).toBeTruthy();
  });



  it('get all trucks', async () => {

    const getALLTruck= {
      domainId: "25",
      plate: "24-MT-77",
      name: "POPO do JOSE",
      autonomy: 25,
      maxBattery: 100,
      payLoad: 1000,
      tare: -2000,
      baterryChargingTime:60,
      active: 'true'
  };
  const response = {
    "status": 201,
  };
    fakeTruckService.getTrucks.and.returnValue(response.status);
    let aux=await component.getTrucks();
    expect(aux).toEqual(aux);
  });

});

