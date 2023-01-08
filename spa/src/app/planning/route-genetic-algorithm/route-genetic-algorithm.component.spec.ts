import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlanningService } from '../planning.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { RouteGeneticAlgorithmComponent } from './route-genetic-algorithm.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
describe('RouteGeneticAlgorithmComponent', () => {
    let component: RouteGeneticAlgorithmComponent;
    let fixture: ComponentFixture<RouteGeneticAlgorithmComponent>;
    let fakeTruckService: any;
  
    const mockSnackBar = {
      open: (message: string, action: string, config) => {}
    };
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ RouteGeneticAlgorithmComponent ],
        imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
        providers: [PlanningService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
      }).compileComponents();
  
      fakeTruckService = jasmine.createSpyObj('TruckService', ['getTrucks']);
      fixture = TestBed.createComponent(RouteGeneticAlgorithmComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.ngOnInit();
    });
  
    it('should get', () => {
      expect(component).toBeTruthy();
    });
  
  
  
    it(' RouteGeneticAlgorithm', async () => {
        const getALLTruck= {
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
  
    const response = new Observable((observer) => {
      observer.next([]);
      observer.complete();
    });
    fakeTruckService.checkGeneticAlgRoute.and.returnValue(response);
      let aux=await component.checkRouteGenetic();
      expect(aux).toBeTruthy(response);
    });
  
  });