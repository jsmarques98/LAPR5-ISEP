import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClientTestingModule,HttpTestingController,} from '@angular/common/http/testing';
import { SectionService } from 'src/app/sections/section.service';
import { CreateSectionsComponent } from './create-sections.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


describe('CreateSectionsComponent', () => {
  let component: CreateSectionsComponent;
  let fixture: ComponentFixture<CreateSectionsComponent>;
  let httpMock: any;

  const mockSnackBar = {
    open: (message: string, action: string, config) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSectionsComponent ],
      imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
      providers: [SectionService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
    }).compileComponents();

    
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(CreateSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('onSubmit with invalid form', async () => {
    component.sectionForm.controls['duration'].setValue('1');
    component.sectionForm.controls['distance'].setValue('1');
    component.sectionForm.controls['energySpent'].setValue('1');
    component.sectionForm.controls['extraTime'].setValue(null);
    await component.createSection();
    expect(component.sectionForm.valid).toBeFalsy();
  });

  it('onSubmit with valid form', async () => {
    component.sectionForm.controls['duration'].setValue('1');
    component.sectionForm.controls['distance'].setValue('1');
    component.sectionForm.controls['energySpent'].setValue('1');
    component.sectionForm.controls['extraTime'].setValue('1');
    await component.createSection();
    expect(component.sectionForm.valid).toBeTruthy();
  });
});