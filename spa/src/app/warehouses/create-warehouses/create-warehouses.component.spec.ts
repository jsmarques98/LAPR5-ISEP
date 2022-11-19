import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehousesComponent } from './create-warehouses.component';

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
});
