import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { WAREHOUSE } from 'src/app/warehouses/mockWarehouses';
  import { WarehouseService } from 'src/app/warehouses/warehouse.service';

/*import { GetWarehousesComponent } from './get-warehouses.component';

describe('GetWarehousesComponent', () => {
  let component: GetWarehousesComponent;
  let fixture: ComponentFixture<GetWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWarehousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

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

