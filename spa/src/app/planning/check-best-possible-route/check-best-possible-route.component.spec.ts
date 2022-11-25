import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBestPossibleRouteComponent } from './check-best-possible-route.component';

describe('CheckBestPossibleRouteComponent', () => {
  let component: CheckBestPossibleRouteComponent;
  let fixture: ComponentFixture<CheckBestPossibleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBestPossibleRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBestPossibleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
