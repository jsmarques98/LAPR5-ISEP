import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';
import { RegisterUserService } from './register-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  roles;
  selectedRole;
  isChecked: boolean;

  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    birthdate: [''],
    email:[''],
    password:[''],
    passwordValidation:[''],
    phoneNumber:[]
  });

  user = new User();

  constructor(private fb: FormBuilder,private router: Router, private service: RegisterUserService,private notification:MatSnackBar) { }

  ngOnInit(): void {
    this.service.getRoles().subscribe(res => this.roles=res);
    
  }

  registerUser():void{

    if (this.isChecked && this.userForm.value.phoneNumber!>99999999 && this.userForm.value.phoneNumber!<1000000000
      && (this.userForm.value.password!) === (this.userForm.value.passwordValidation)) {

    this.user.firstName=this.userForm.value.firstName!;
    this.user.lastName=this.userForm.value.lastName!;
    this.user.email=this.userForm.value.email!;
    this.user.password=this.userForm.value.password!;
    this.user.role=this.selectedRole;
    this.user.phoneNumber=this.userForm.value.phoneNumber!;
    
    this.service.registerUser(this.user).subscribe((res) => {
      this.mostrarNotificacao('Post Efetuado com sucesso!',false);
      this.router.navigate(['/home']);
    },
    (error) => {
      if(error.status==402){
        this.mostrarNotificacao(error.error,true);
      }
    else{
      this.mostrarNotificacao(error.error.errors.message,true);
    }
  });
  }
}

  selectRole(e) {
    this.selectedRole=e.target.value
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
}
