import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Warehouse1} from 'src/app/warehouses/mockWarehouses';
  import { WarehouseService } from 'src/app/warehouses/warehouse.service';
  import { Warehouse } from 'src/app/warehouses/warehouses';

/*import { UpdateWarehousesComponent } from './update-warehouses.component';

describe('UpdateWarehousesComponent', () => {
  let component: UpdateWarehousesComponent;
  let fixture: ComponentFixture<UpdateWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWarehousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWarehousesComponent);
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