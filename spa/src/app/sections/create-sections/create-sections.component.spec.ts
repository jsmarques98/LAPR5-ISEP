import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {HttpClientTestingModule,HttpTestingController,} from '@angular/common/http/testing';
import { Section1} from 'src/app/sections/mockSections';
import { SectionService } from 'src/app/sections/section.service';
import { Section } from 'src/app/sections/section';
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

describe('SectionService', () => {
  let service: SectionService;
  let httpController: HttpTestingController;

  let url = 'http://10.9.20.241:3000/';
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatSnackBarModule],
      });
      service = TestBed.inject(SectionService);
      httpController = TestBed.inject(HttpTestingController);
    });

    it('should call addSection', () => {
        const createdSection: Section = {
            id: "50",
            warehouseOrigin: "5",
            warehouseDestiny:"6",
            duration: 345,
            distance: 234,
            energySpent: 345,
            extraTime: 324
        };

        const response ={
          "status": 201,
        }
    
        service.addSection(createdSection).subscribe((data) => {
          expect(data.body).toEqual(201);
        });
    
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/sections/`,
        });
    
        req.flush(response.status);
    });

    it('create truck fail', () => {
      const createdSection: Section = {
        id: "50",
        warehouseOrigin: "5",
        warehouseDestiny:"6",
        duration: 345,
        distance: -234,
        energySpent: 345,
        extraTime: 324
    };

    const response ={
      "status": 402,
    }

      const sections= service.addSection(createdSection).subscribe((data) => {
        expect(data.body).toEqual(402);
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: `${url}api/sections/`,
      });
      req.flush(response.status);
          
  });
})
