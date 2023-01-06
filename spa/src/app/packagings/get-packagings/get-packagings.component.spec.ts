import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { PackagingService } from 'src/app/packagings/packaging.service';
  import { PACKAGING } from 'src/app/packagings/mockPackagings';
import { environment } from 'src/environments/environment';


  /*describe('GetPackagingsComponent', () => {
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
}); */

describe('PackagingService', () => {
  let service: PackagingService;
  let httpController: HttpTestingController;

  let url = 'https://localhost:3000/';
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatSnackBarModule],
      });
      service = TestBed.inject(PackagingService);
      httpController = TestBed.inject(HttpTestingController);
    });

  it('should call getPackagings and return an array of Packagings', () => {
          // 1
        service.getPackagings().subscribe((res) => {
              //2
        expect(res).toEqual(PACKAGING);
      });
          const request = httpController.expectOne(`${environment.logisticsAPI}${environment.logisticsAPIPackagings}`);
          expect(request.request.method).toEqual('GET');
          request.flush(PACKAGING);
    });
})
