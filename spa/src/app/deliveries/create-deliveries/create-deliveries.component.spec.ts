import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveriesComponent } from './create-deliveries.component';

describe('CreateDeliveriesComponent', () => {
  let component: CreateDeliveriesComponent;
  let fixture: ComponentFixture<CreateDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeliveriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
