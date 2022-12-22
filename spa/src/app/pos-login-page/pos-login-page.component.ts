import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-pos-login-page',
  templateUrl: './pos-login-page.component.html',
  styleUrls: ['./pos-login-page.component.css']
})
export class PosLoginPageComponent implements OnInit {
  constructor(private router: Router, private loginService : LoginService) { }

  ngOnInit(): void {
  }
  
  admin=Boolean(localStorage.getItem("admin"));
  warehouseManager=Boolean(localStorage.getItem("warehouseManager"));
  fleetManager=Boolean(localStorage.getItem("fleetManager"));
  logisticsManager=Boolean(localStorage.getItem("logisticsManager"));

  logout():void{
    this.loginService.logout();
    this.router.navigate(["/login"])
  }

}
