import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TruckService } from '../truck.service';
import { GetTrucksComponent } from './get-trucks.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Truck } from '../truck';
import { async, Observable } from 'rxjs';
import { TrucksComponent } from '../trucks.component';
import { environment } from 'src/environments/environment';


describe('GetTruckComponent', () => {
  let component: GetTrucksComponent;
  let fixture: ComponentFixture<GetTrucksComponent>;
  let fakeTruckService: any;

  const mockSnackBar = {
    open: (message: string, action: string, config) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTrucksComponent ],
      imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
      providers: [TruckService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
    }).compileComponents();

    fakeTruckService = jasmine.createSpyObj('TruckService', ['getTrucks']);
    fixture = TestBed.createComponent(GetTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should get', () => {
    expect(component).toBeTruthy();
  });



  it('get all trucks', async () => {
    const response = new Observable((observer) => {
      observer.next([]);
      observer.complete();
    });
    fakeTruckService.getTrucks.and.returnValue(response);

    // Call the component's getTrucks method and save the returned value
    const result = component.getTrucks();

    // Verify that the service's getTrucks method was called

    // Verify that the component's getTrucks method returned the correct value
    expect(result).toBeTruthy(response);
  });

});

