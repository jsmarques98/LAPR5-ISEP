import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Packaging1} from 'src/app/packagings/mockPackagings';
  import { PackagingService } from 'src/app/packagings/packaging.service';
  import { Packaging } from 'src/app/packagings/packaging';

/*import { CreatePackagingsComponent } from './create-packagings.component';

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
});*/

describe('PackagingService', () => {
  let service: PackagingService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:3000/';
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatSnackBarModule],
      });
      service = TestBed.inject(PackagingService);
      httpController = TestBed.inject(HttpTestingController);
    });

    it('should call addPackaging', () => {
        const createdPackaging: Packaging = {
            id: '50',
            positionX:"12345", 
            positionY: "123245", 
            positionZ: "1234567", 
            truckId: "1", 
            deliveryId: "1"
        };
    
        service.addPackaging(Packaging1).subscribe((data) => {
          expect(data).toEqual(createdPackaging);
        });
    
        const req = httpController.expectOne({
          method: 'POST',
          url: `${url}api/packagings`,
        });
    
        req.flush(createdPackaging);
    });
})
