import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Truck1} from 'src/app/trucks/mockTrucks';
  import { TruckService } from 'src/app/trucks/truck.service';
  import { Truck } from 'src/app/trucks/truck';

/*import { CreateTrucksComponent } from './create-trucks.component';

describe('CreateTrucksComponent', () => {
  let component: CreateTrucksComponent;
  let fixture: ComponentFixture<CreateTrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

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

    it('should call addTruck', () => {
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
    
        service.addTruck(Truck1).subscribe((data) => {
          expect(data).toEqual(createdTruck);
        });
    
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/trucks/`,
        });
    
        req.flush(createdTruck);
    });
})
