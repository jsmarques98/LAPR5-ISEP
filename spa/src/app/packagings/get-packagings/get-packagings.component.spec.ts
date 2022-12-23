import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPackagingsComponent } from './get-packagings.component';

describe('GetPackagingsComponent', () => {
  let component: GetPackagingsComponent;
  let fixture: ComponentFixture<GetPackagingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPackagingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPackagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
