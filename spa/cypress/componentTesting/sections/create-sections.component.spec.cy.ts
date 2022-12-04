import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Section1} from 'src/app/sections/mockSections';
  import { SectionService } from 'src/app/sections/section.service';
  import { Section } from 'src/app/sections/section';
  
  describe('WarehouseService', () => {
      let service: SectionService;
      let httpController: HttpTestingController;
  
      let url = 'http://localhost:3000/';
      
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
        
            service.addSection(Section1).subscribe((data) => {
              expect(data).equal(createdSection);
            });
        
            const req = httpController.expectOne({
              method: 'POST',
              url: `${url}api/sections`,
            });
        
            req.flush(createdSection);
        });
    })