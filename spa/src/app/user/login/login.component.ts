import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService, private router: Router, private loginService : LoginService) {
    localStorage.setItem("admin","");
    localStorage.setItem("warehouseManager","");
    localStorage.setItem("fleetManager","");
    localStorage.setItem("logisticsManager","");
   }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      let aux ;
      this.loginService.login(user.email).subscribe(res => {
        aux = res;
        if(aux.token != null && aux.userDTO != null){
          this.loginService.setSession(res);
          localStorage.setItem("profileimage",user.photoUrl)

          switch ( aux.userDTO.role ) {
            case "Administrator":
              localStorage.setItem("admin","true");
                break;
            case "Logistics Manager":
              localStorage.setItem("logisticsManager","true");
                break;
            case "Fleet Manager":
              localStorage.setItem("fleetManager","true");
                break;
            case "Warehouse Manager":
              localStorage.setItem("warehouseManager","true");
                break;
         }
         this.router.navigate(["/home"])


        }else{
          this.router.navigate(["/login"])
        }
      })
    });


  }


}
