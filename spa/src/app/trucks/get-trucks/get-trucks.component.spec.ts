import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTrucksComponent } from './get-trucks.component';

describe('GetTrucksComponent', () => {
  let component: GetTrucksComponent;
  let fixture: ComponentFixture<GetTrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTrucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
