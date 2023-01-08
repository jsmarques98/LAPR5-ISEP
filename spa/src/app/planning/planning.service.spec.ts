import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanningService } from './planning.service';
import { Planning } from './planning';
import { PlanningGenetic } from './route-genetic-algorithm/planningGenetic';





describe('PlanningService', () => {
  describe('PlanningService', () => {
    let service: PlanningService;
    let httpController: HttpTestingController;
  
    let url = 'http://localhost:3000/';
    
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(PlanningService);
        httpController = TestBed.inject(HttpTestingController);
      });
  


      it('get all ', () => {
        const planning: PlanningGenetic = {
          deliveryDate: "01/01/2023",
          numGer: 5,
          dimPop: 5,
          perC: 50,
          perM: 30,
          refVal: 500
        };
        const response = {
          status: 200
        };
      
        service.checkGeneticAlgRoute(planning).subscribe((data) => {
          expect(data.status).toEqual(200);
        });
        const req = httpController.expectOne({
          method: 'GET',
          url: `${url}api/plannings/geneticAlg?deliveryDate=01/01/2023&numGer=5&dimPop=5&perC=50&perM=30&refVal=500`,
        });
        req.flush(response);      
      });
  });
});