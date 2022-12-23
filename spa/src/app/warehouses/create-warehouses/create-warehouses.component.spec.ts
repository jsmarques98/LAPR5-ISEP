import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Warehouse1} from 'src/app/warehouses/mockWarehouses';
  import { WarehouseService } from 'src/app/warehouses/warehouse.service';
  import { Warehouse } from 'src/app/warehouses/warehouses';
  
/*import { CreateWarehousesComponent } from './create-warehouses.component';

describe('CreateWarehousesComponent', () => {
  let component: CreateWarehousesComponent;
  let fixture: ComponentFixture<CreateWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWarehousesComponent);
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

  let url = 'https://localhost:5001/';
  
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
          expect(data).toEqual(createdWarehouse);
        });
    
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/Warehouses`,
        });
    
        req.flush(createdWarehouse);
    });
})
