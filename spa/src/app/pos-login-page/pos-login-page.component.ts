import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../user/login/login.service';

@Component({
  selector: 'app-pos-login-page',
  templateUrl: './pos-login-page.component.html',
  styleUrls: ['./pos-login-page.component.css']
})
export class PosLoginPageComponent implements OnInit {
  constructor(private router: Router, private loginService : LoginService,private elementRef: ElementRef) { }
  userimage;
  imageType;
  
  ngOnInit(): void {
    if(localStorage.getItem("loginType") === "0"){
      this.imageType=true;
      this.userimage = localStorage.getItem("profileimage");
    }else{
      this.imageType=false;
    }
  }
  
  admin=Boolean(localStorage.getItem("admin"));
  warehouseManager=Boolean(localStorage.getItem("warehouseManager"));
  fleetManager=Boolean(localStorage.getItem("fleetManager"));
  logisticsManager=Boolean(localStorage.getItem("logisticsManager"));

  logout():void{
    this.loginService.logout();
    this.router.navigate(["/login"])
  }


  toggleMenu() {
    const menu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    if (menu) {
      menu.classList.toggle('show');
    }
  }
}
