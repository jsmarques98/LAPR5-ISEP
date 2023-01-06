import { TestBed } from '@angular/core/testing';
import { WarehouseService } from './warehouse.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateWarehousesComponent } from './create-warehouses/create-warehouses.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormBuilder } from '@angular/forms';
import { GetWarehousesComponent } from './get-warehouses/get-warehouses.component';
import { GetWarehousesByIdComponent } from './get-warehouses-by-id/get-warehouses-by-id.component';
import { UpdateWarehousesComponent } from './update-warehouses/update-warehouses.component';


// Integration test between WarehouseService and CreateWarehousesComponent
describe('WarehouseService and CreateWarehousesComponent integration test', () => {
  let warehouseService: WarehouseService;
  let createWarehousesComponent: CreateWarehousesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, OverlayModule],
      providers: [WarehouseService, CreateWarehousesComponent, MatSnackBar, { provide: FormBuilder, useValue: new FormBuilder() } ],
    });

    warehouseService = TestBed.inject(WarehouseService);
    createWarehousesComponent = TestBed.inject(CreateWarehousesComponent);
  });

  it('should call addWarehouse on the service when createWarehouse is called on the component', () => {
    // Create a spy on the addWarehouse method of the service
    spyOn(warehouseService, 'addWarehouse').and.callThrough();

    // Call the createWarehouse method on the component
    createWarehousesComponent.createWarehouse();

    // Assert that the addWarehouse method was called on the service
    expect(warehouseService.addWarehouse).toHaveBeenCalled();
  });
});



// Integration test between WarehouseService and GetWarehousesComponent
describe('WarehouseService and GetWarehousesComponent integration test', () => {
    let warehouseService: WarehouseService;
    let getWarehousesComponent: GetWarehousesComponent;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, OverlayModule],
        providers: [WarehouseService, GetWarehousesComponent, MatSnackBar, { provide: FormBuilder, useValue: new FormBuilder() } ],
      });
  
      warehouseService = TestBed.inject(WarehouseService);
      getWarehousesComponent = TestBed.inject(GetWarehousesComponent);
    });
  
    it('should call getWarehouses on the service when getWarehouse is called on the component', () => {
      // Create a spy on the getWarehouse method of the service
      spyOn(warehouseService, 'getWarehouses').and.callThrough();
  
      // Call the createWarehouse method on the component
      getWarehousesComponent.getWarehouses();
  
      // Assert that the addWarehouse method was called on the service
      expect(warehouseService.getWarehouses).toHaveBeenCalled();
    });
});

  

  // Integration test between WarehouseService and GetWarehousesByIdComponent
describe('WarehouseService and GetWarehousesByIdComponent integration test', () => {
    let warehouseService: WarehouseService;
    let getWarehousesByIdComponent: GetWarehousesByIdComponent;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, OverlayModule],
        providers: [WarehouseService, GetWarehousesByIdComponent, MatSnackBar, { provide: FormBuilder, useValue: new FormBuilder() } ],
      });
  
      warehouseService = TestBed.inject(WarehouseService);
      getWarehousesByIdComponent = TestBed.inject(GetWarehousesByIdComponent);
    });
  
    it('should call getWarehouseById on the service when getWarehouseById is called on the component', () => {
      // Create a spy on the getWarehouse method of the service
      spyOn(warehouseService, 'getWarehouseById').and.callThrough();
  
      // Call the createWarehouse method on the component
      getWarehousesByIdComponent.getWarehouseById();
  
      // Assert that the addWarehouse method was called on the service
      expect(warehouseService.getWarehouseById).toHaveBeenCalled();
    });
});


  // Integration test between WarehouseService and UpdateWarehousesComponent
describe('WarehouseService and UpdateWarehousesComponent integration test', () => {
    let warehouseService: WarehouseService;
    let updateWarehousesComponent: UpdateWarehousesComponent;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, OverlayModule],
        providers: [WarehouseService, UpdateWarehousesComponent, MatSnackBar, { provide: FormBuilder, useValue: new FormBuilder() } ],
      });
  
      warehouseService = TestBed.inject(WarehouseService);
      updateWarehousesComponent = TestBed.inject(UpdateWarehousesComponent);
    });
  
    it('should call updateWarehouse on the service when updateWarehouse is called on the component', () => {
      // Create a spy on the getWarehouse method of the service
      spyOn(warehouseService, 'updateWarehouse').and.callThrough();
  
      // Call the createWarehouse method on the component
      updateWarehousesComponent.updateWarehouse();
  
      // Assert that the addWarehouse method was called on the service
      expect(warehouseService.updateWarehouse).toHaveBeenCalled();
    });
});