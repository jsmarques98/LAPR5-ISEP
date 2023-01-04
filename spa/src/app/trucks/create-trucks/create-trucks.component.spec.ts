import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TruckService } from '../truck.service';
import { CreateTrucksComponent } from './create-trucks.component';

  import { Truck1} from 'src/app/trucks/mockTrucks';
  import { Truck } from 'src/app/trucks/truck';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


describe('CreateTruckComponent', () => {
  let component: CreateTrucksComponent;
  let fixture: ComponentFixture<CreateTrucksComponent>;
  let httpMock: any;

  const mockSnackBar = {
    open: (message: string, action: string, config) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrucksComponent ],
      imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
      providers: [TruckService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
    }).compileComponents();

    
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(CreateTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('onSubmit with invalid form', async () => {
    component.truckForm.controls['plate'].setValue('22-22-FA');
    component.truckForm.controls['name'].setValue('Popo');
    component.truckForm.controls['autonomy'].setValue('1');
    component.truckForm.controls['maxBattery'].setValue('1');
    component.truckForm.controls['payLoad'].setValue('1');
    component.truckForm.controls['tare'].setValue('1');
    component.truckForm.controls['baterryChargingTime'].setValue(null);
    await component.createTruck();
    expect(component.truckForm.valid).toBeFalsy();
  });

  it('onSubmit with valid form', async () => {
    component.truckForm.controls['plate'].setValue('22-22-FA');
    component.truckForm.controls['name'].setValue('Popo');
    component.truckForm.controls['autonomy'].setValue('1');
    component.truckForm.controls['maxBattery'].setValue('1');
    component.truckForm.controls['payLoad'].setValue('1');
    component.truckForm.controls['tare'].setValue('1');
    component.truckForm.controls['baterryChargingTime'].setValue('1');
    await component.createTruck();
    expect(component.truckForm.valid).toBeTruthy();
  });
});

describe('TruckService', () => {
  describe('TruckService', () => {
    let service: TruckService;
    let httpController: HttpTestingController;
  
    let url = 'http://localhost:3000/';
    
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(TruckService);
        httpController = TestBed.inject(HttpTestingController);
      });
  
      it('create truck sucess', () => {
          const createdTruck: Truck = {
              domainId: "25",
              plate: "24-MT-77",
              name: "POPO do JOSE",
              autonomy: 25,
              maxBattery: 100,
              payLoad: 1000,
              tare: 2000,
              baterryChargingTime:60,
              active: 'true'
          };
          const response = {
            "status": 201,
          };
      
          service.addTruck(createdTruck).subscribe((data) => {
            expect(data.body).toEqual(201);
          });
      
          const req = httpController.expectOne({
            method: 'POST',
            url: `${url}api/trucks/`,
          });
          req.flush(response.status);
      });

      it('create truck fail', () => {
        const createdTruck: Truck = {
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
          "status": 402,
        };

        const trucks= service.addTruck(createdTruck).subscribe((data) => {
  console.log(data)
          expect(data.body).toEqual(402);
        });
        console.log(trucks)
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/trucks/`,
        });
        req.flush(response.status);

       
      

        
    
      
    });
    
  });

});