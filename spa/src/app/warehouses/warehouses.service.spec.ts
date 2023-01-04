import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';

import { Warehouse1} from 'src/app/warehouses/mockWarehouses';
import { WarehouseService } from 'src/app/warehouses/warehouse.service';
import { Warehouse } from 'src/app/warehouses/warehouses';
import { WAREHOUSE } from 'src/app/warehouses/mockWarehouses';


describe('WarehouseService', () => {
    let service: WarehouseService;
    let httpController: HttpTestingController;
  
    let url = 'http://localhost:5000/';
    
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(WarehouseService);
        httpController = TestBed.inject(HttpTestingController);
      });
  
      it('should call addWarehouse', () => {
          const createdWarehouse: Warehouse = {
            id: '25',
            designation: "Armazém do Porto",
            street: "Rua Julio Dinis",
            doorNumber: 25,
            postCode: "4150-332",
            city:"Porto",
            latitude: 60.0,
            longitude:60.0,
            altitude: 60.0,
            active: 'true'
          };
      
          service.addWarehouse(Warehouse1).subscribe((data) => {
            expect(data.body).toEqual(createdWarehouse);
          });
      
          const req = httpController.expectOne({
            method: 'POST',
            url: `${url}api/warehouses/`,
          });
      
          req.flush(createdWarehouse);
      });
  })

  describe('WarehouseService', () => {
    let service: WarehouseService;
    let httpController: HttpTestingController;
  
    let url = 'http://localhost:5000/';
    
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
          expect(res).toEqual(WAREHOUSE);
        });
    
            //3
        const req = httpController.expectOne({
          method: 'GET',
          url: `${url}api/warehouses/`,
        });
  
            //4
        req.flush(WAREHOUSE);
      });
  })

  describe('WarehouseService', () => {
    let service: WarehouseService;
    let httpController: HttpTestingController;
  
    let url = 'http://localhost:5000/';
    
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(WarehouseService);
        httpController = TestBed.inject(HttpTestingController);
      });
  
  
  
    it('should call getWarehouseById and return a Warehouse', () => {
           // Arrange
           const id = '25';
  
           // Act
          service.getWarehouseById(id).subscribe((res) => {
          
          //2
          expect(res).toEqual(Warehouse1);
        });
    
            //3
        const req = httpController.expectOne({
          method: 'GET',
          url: `${url}api/warehouses/${id}`,
        });
  
            //4
        req.flush(Warehouse1);
      });
  })

  describe('WarehouseService', () => {
    let service: WarehouseService;
    let httpController: HttpTestingController;
  
    let url = 'http://localhost:5000/';
    
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(WarehouseService);
        httpController = TestBed.inject(HttpTestingController);
      });
  
      it('should call updateWarehouse and return the updated warehouse from the API', () => {
          const updatedWarehouse: Warehouse = {
            id: '25',
            designation: "Armazém do Porto",
            street: "Rua Julio Dinis",
            doorNumber: 25,
            postCode: "4150-332",
            city:"Porto",
            latitude: 60.0,
            longitude:60.0,
            altitude: 60.0,
            active: "true"
          };
      
          service.updateWarehouse(Warehouse1).subscribe((data) => {
            expect(data).toEqual(updatedWarehouse);
          });
      
          const req = httpController.expectOne({
            method: 'PUT',
            url: `${url}api/warehouses/${updatedWarehouse.id}`,
          });
      
          req.flush(updatedWarehouse);
      });
  })