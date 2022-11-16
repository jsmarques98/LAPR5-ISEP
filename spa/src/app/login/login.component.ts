import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder,private loginService: LoginService,private router: Router,) { 
  }

  ngOnInit(): void {
  }

  login(): void {
  
    let email = this.loginForm.value.email!;

    let password = this.loginForm.value.password!;


    if(this.loginService.login(email,password)){
      this.router.navigate(['/home']);
    }
    

  }

}
