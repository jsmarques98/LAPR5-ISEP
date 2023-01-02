import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdTermsComponent } from './rgpd-terms.component';

describe('RgpdTermsComponent', () => {
  let component: RgpdTermsComponent;
  let fixture: ComponentFixture<RgpdTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgpdTermsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
