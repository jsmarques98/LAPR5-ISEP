import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { WAREHOUSE } from 'src/app/warehouses/mockWarehouses';
  import { WarehouseService } from 'src/app/warehouses/warehouse.service';
  
  describe('WarehouseService', () => {
      let service: WarehouseService;
      let httpController: HttpTestingController;
  
      let url = 'https://localhost:5001/';
      
        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
          });
          service = TestBed.inject(WarehouseService);
          httpController = TestBed.inject(HttpTestingController);
        });
  
  
    
      it('should call getWarehouses and return an array of Warehouses', () => {
              // 1
            service.getWarehouses().subscribe((res) => {
                  //2
            expect(res).equal(WAREHOUSE);
          });
      
              //3
          const req = httpController.expectOne({
            method: 'GET',
            url: `${url}api/Warehouses/`,
          });
  
              //4
          req.flush(WAREHOUSE);
        });
  })