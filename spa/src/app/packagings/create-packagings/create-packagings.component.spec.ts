import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackagingsComponent } from './create-packagings.component';

describe('CreatePackagingsComponent', () => {
  let component: CreatePackagingsComponent;
  let fixture: ComponentFixture<CreatePackagingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackagingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePackagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
