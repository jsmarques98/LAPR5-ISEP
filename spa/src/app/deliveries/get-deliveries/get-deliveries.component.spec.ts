import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { DELIVERY } from 'src/app/deliveries/mockDeliveries';
  import { DeliveryService } from 'src/app/deliveries/delivery.service';

/*import { GetDeliveriesComponent } from './get-deliveries.component';

describe('GetDeliveriesComponent', () => {
  let component: GetDeliveriesComponent;
  let fixture: ComponentFixture<GetDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDeliveriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:5000/';
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatSnackBarModule],
      });
      service = TestBed.inject(DeliveryService);
      httpController = TestBed.inject(HttpTestingController);
    });



  it('should call getDeliveries and return an array of Deliveries', () => {
          // 1
        service.getDeliveries().subscribe((res) => {
              //2
        expect(res).toEqual(DELIVERY);
      });
  
          //3
      const req = httpController.expectOne({
        method: 'GET',
        url: `${url}api/deliveries/`,
      });

          //4
      req.flush(DELIVERY);
    });
})
