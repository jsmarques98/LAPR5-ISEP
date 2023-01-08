import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing';
  
  import { Packaging1} from 'src/app/packagings/mockPackagings';
  import { PackagingService } from 'src/app/packagings/packaging.service';
  import { Packaging } from 'src/app/packagings/packaging';

/*import { UpdatePackagingsComponent } from './update-packagings.component';

describe('UpdatePackagingsComponent', () => {
  let component: UpdatePackagingsComponent;
  let fixture: ComponentFixture<UpdatePackagingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePackagingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePackagingsComponent);
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

  let url = 'http://10.9.20.241:3000/'; 
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatSnackBarModule],
      });
      service = TestBed.inject(PackagingService);
      httpController = TestBed.inject(HttpTestingController);
    });

    it('should call updatePackaging and return the updated packaging from the API', () => {
        const updatedPackaging: Packaging = {
          deliveryDate: '05/12/2022',
            deliveryWarehouseId: '1',
            deliveryId: "1",
            id: '50',
            positionX:"12345", 
            positionY: "123245", 
            positionZ: "1234567", 
            truckPlate: "1"
        };
    
        service.updatePackaging(Packaging1).subscribe((data) => {
          expect(data).toEqual(updatedPackaging);
        });
    
        const req = httpController.expectOne({
          method: 'PUT',
          url: `${url}api/packagings/`,
        });
    
        req.flush(updatedPackaging);
    });
})
