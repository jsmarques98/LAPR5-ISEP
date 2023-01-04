import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  image;
  loginType;
  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
    this.loginService.getUserDetails().subscribe(res => {
      this.user= res;
      if(localStorage.getItem("loginType") === "0"){
        this.loginType=true;
        this.image = localStorage.getItem("profileimage");
      }else{
        this.loginType=false;
      }
      
    })    
  }

  logout():void{
    this.loginService.logout();
    this.router.navigate(["/login"])
  }

  updateInfo():void{
    this.router.navigate(["/updateUserInfo"])
  }

}
