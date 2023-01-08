import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TruckService } from './truck.service';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Truck } from './truck';





describe('TruckService', () => {
  describe('TruckService', () => {
    let service: TruckService;
    let httpController: HttpTestingController;
  
    let url = 'http://10.9.20.241:3000/';
    
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
          expect(data.body).toEqual(402);
        });
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/trucks/`,
        });
        req.flush(response.status);      
    });

    it('get all ', () => {
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
       

        service.getTrucks().subscribe((data) => {  
          expect(data.body).toEqual(createdTruck);
        });
        const req = httpController.expectOne({
          method: 'GET',
          url: `${url}api/trucks/`,
        });
        req.flush(createdTruck);      
    });

    it('delete Truck ', () => {
            
        const response = {
            "status": 200,
          };
      
        service.deleteTruck("24-MT-77").subscribe((data) => {  
          expect(data).toEqual(200);
        });

        const req = httpController.expectOne({
          method: 'DELETE',
          url: `${url}api/trucks/`,
        });
        req.flush(response.status);      
    });

    it('inactive Truck ', () => {
            
        const response = {
            "status": 200,
          };
      
        service.inactiveTruck("24-MT-77").subscribe((data) => {  
          expect(data).toEqual(200);
        });
        
        const req = httpController.expectOne({
          method: 'PATCH',
          url: `${url}api/trucks/inactive`,
        });
        req.flush(response.status);  
            
    });

    it('active Truck ', () => {
            
        const response = {
            "status": 200,
          };
      
        service.activateTruck("24-MT-77").subscribe((data) => {  
          expect(data).toEqual(200);
        });
        
        const req = httpController.expectOne({
          method: 'PATCH',
          url: `${url}api/trucks/active`,
        });
        req.flush(response.status);       
    });
  });
});