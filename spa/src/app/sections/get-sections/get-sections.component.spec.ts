import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { SECTION } from 'src/app/sections/mockSections';
  import { SectionService } from 'src/app/sections/section.service';

/*import { GetSectionsComponent } from './get-sections.component';

describe('GetSectionsComponent', () => {
  let component: GetSectionsComponent;
  let fixture: ComponentFixture<GetSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

// describe('SectionService', () => {
//   let service: SectionService;
//   let httpController: HttpTestingController;

//   let url = 'http://localhost:3000/';
  
//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule, MatSnackBarModule],
//       });
//       service = TestBed.inject(SectionService);
//       httpController = TestBed.inject(HttpTestingController);
//     });



// //   it('should call getSections and return an array of Sections', () => {
// //           // 1
// //         service.getSections().subscribe((res) => {
// //               //2
// //         expect(res).toEqual(SECTION);
// //       });
  
// //           //3
// //       const req = httpController.expectOne({
// //         method: 'GET',
// //         url: `${url}api/sections/`,
// //       });

// //           //4
// //       req.flush(SECTION);
// //     });
//  })
