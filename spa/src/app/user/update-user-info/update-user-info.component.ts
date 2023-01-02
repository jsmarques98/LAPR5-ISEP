import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';
import { UpdateUserService } from './update-user.service';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {
  user= new User();
  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    password:[''],
    passwordValidation:[''],
    phoneNumber:[]
  });
  constructor(private fb: FormBuilder,private router: Router,private service : UpdateUserService, private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  updateUserInfo(){
    this.user.email=localStorage.getItem("useremail")!;
    this.user.firstName=this.userForm.value.firstName!
    this.user.lastName=this.userForm.value.lastName!
    this.user.password=this.userForm.value.password!
    this.user.phoneNumber=this.userForm.value.phoneNumber!

    this.service.updateUserInfo(this.user).subscribe(res => {      
      if (res != null) {

      this.mostrarNotificacao('User atualizado com sucesso!',false)
    }else{
      this.mostrarNotificacao('User não atualizado!',true)
    }})

  }

  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
