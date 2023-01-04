import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Warehouse1} from 'src/app/warehouses/mockWarehouses';
  import { WarehouseService } from 'src/app/warehouses/warehouse.service';
  import { Warehouse } from 'src/app/warehouses/warehouses';
  
import { CreateWarehousesComponent } from './create-warehouses.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('CreateWarehousesComponent', () => {
  let component: CreateWarehousesComponent;
  let fixture: ComponentFixture<CreateWarehousesComponent>;
  let httpMock: HttpTestingController;

  const mockSnackBar = {
    open: (message: string, action: string, config) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehousesComponent ],
      imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
      providers: [WarehouseService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
    }).compileComponents();

    
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(CreateWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('onSubmit with invalid form', async () => {
    component.warehouseForm.controls['id'].setValue('75');
    component.warehouseForm.controls['warehouseDesignation'].setValue('Foz');
    component.warehouseForm.controls['warehouseStreet'].setValue('Rua julio dantas');
    component.warehouseForm.controls['warehouseDoorNumber'].setValue(317);
    component.warehouseForm.controls['warehousePostCode'].setValue('4150');
    component.warehouseForm.controls['warehouseCity'].setValue('Porto');
    component.warehouseForm.controls['warehouseLatitude'].setValue(null);
    component.warehouseForm.controls['warehouseLongitude'].setValue(null);
    component.warehouseForm.controls['warehouseAltitude'].setValue(null);
    await component.createWarehouse();
    expect(component.warehouseForm.valid).toBeFalsy();
  });

  it('onSubmit with valid form', async () => {
    component.warehouseForm.controls['id'].setValue('75');
    component.warehouseForm.controls['warehouseDesignation'].setValue('Foz');
    component.warehouseForm.controls['warehouseStreet'].setValue('Rua julio dantas');
    component.warehouseForm.controls['warehouseDoorNumber'].setValue(317);
    component.warehouseForm.controls['warehousePostCode'].setValue('4150');
    component.warehouseForm.controls['warehouseCity'].setValue('Porto');
    component.warehouseForm.controls['warehouseLatitude'].setValue(60);
    component.warehouseForm.controls['warehouseLongitude'].setValue(60);
    component.warehouseForm.controls['warehouseAltitude'].setValue(1);
    await component.createWarehouse();
    expect(component.warehouseForm.valid).toBeTruthy();
  });
});


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
          expect(data).toEqual(createdWarehouse);
        });
    
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/warehouses/`,
        });
    
        req.flush(createdWarehouse);
    });
})
