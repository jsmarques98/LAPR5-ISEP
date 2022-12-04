import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Delivery1} from 'src/app/deliveries/mockDeliveries';
  import { DeliveryService } from 'src/app/deliveries/delivery.service';
  import { Delivery } from 'src/app/deliveries/delivery';
  
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

        it('should call addDelivery', () => {
            const createdDelivery: Delivery = {
                id: "25",
                deliveryDate: "20221204",
                loadTime: 30,
                unloadTime: 25,
                totalWeight: 1000,
                deliveryWarehouseId:"25"
            };
        
            service.addDelivery(Delivery1).subscribe((data) => {
              expect(data).equal(createdDelivery);
            });
        
            const req = httpController.expectOne({
              method: 'POST',
              url: `${url}api/deliveries`,
            });
        
            req.flush(createdDelivery);
        });
    })