import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWarehousesComponent } from './update-warehouses.component';

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
});
