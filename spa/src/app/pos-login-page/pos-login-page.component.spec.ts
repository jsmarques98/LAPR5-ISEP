import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosLoginPageComponent } from './pos-login-page.component';

describe('PosLoginPageComponent', () => {
  let component: PosLoginPageComponent;
  let fixture: ComponentFixture<PosLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
