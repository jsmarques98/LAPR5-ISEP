import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { WAREHOUSE } from 'src/app/warehouses/mockWarehouses';
  import { Warehouse1 } from 'src/app/warehouses/mockWarehouses';
  import { WarehouseService } from 'src/app/warehouses/warehouse.service';

/*import { GetWarehousesByIdComponent } from './get-warehouses-by-id.component';

describe('GetWarehousesByIdComponent', () => {
  let component: GetWarehousesByIdComponent;
  let fixture: ComponentFixture<GetWarehousesByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWarehousesByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetWarehousesByIdComponent);
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

  let url = 'http://localhost:5001/';
  
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