import {TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {HttpClientTestingModule,HttpTestingController,} from '@angular/common/http/testing';
import { SectionService } from 'src/app/sections/section.service';
import { Section } from 'src/app/sections/section';
import { SECTION } from 'src/app/sections/mockSections';



describe('SectionService', () => {
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


    describe('SectionService', () => {
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


    it('should call getSections and return an array of Sections', () => {
            // 1
            service.getSections(0, 0).subscribe((res) => {
                //2
            expect(res).toEqual(SECTION);
        });

            //3
        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}api/sections/pag/?skip=0&limit=0`,
        });

            //4
        req.flush(SECTION);
        });
})