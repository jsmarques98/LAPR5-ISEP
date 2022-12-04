import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { TRUCK } from 'src/app/trucks/mockTrucks';
  import { TruckService } from 'src/app/trucks/truck.service';
  
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
  
  
    
      it('should call getTrucks', () => {
              // 1
            service.getTrucks().subscribe((res) => {
                  //2
            expect(res).equal(TRUCK);
          });
      
              //3
          const req = httpController.expectOne({
            method: 'GET',
            url: `${url}api/trucks/`,
          });
  
              //4
          req.flush(TRUCK);
        });
  })