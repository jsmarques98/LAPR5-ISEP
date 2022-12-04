import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { DELIVERY } from 'src/app/deliveries/mockDeliveries';
  import { DeliveryService } from 'src/app/deliveries/delivery.service';
  
  describe('DeliveryService', () => {
      let service: DeliveryService;
      let httpController: HttpTestingController;
  
      let url = 'https://localhost:5001/';
      
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
            expect(res).equal(DELIVERY);
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