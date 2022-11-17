import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrucksComponent } from './create-trucks.component';

describe('CreateTrucksComponent', () => {
  let component: CreateTrucksComponent;
  let fixture: ComponentFixture<CreateTrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
