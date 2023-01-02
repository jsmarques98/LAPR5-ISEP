import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';
import { DeleteUserService } from './delete-user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  user;

  userForm = this.fb.group({
    email: [''],
  });
  visible ?: User;

  constructor(private fb: FormBuilder, private router: Router, private service : DeleteUserService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  deleteUser(email : string){
    
    this.service.deleteUser(email).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('User eliminado com sucesso!',false)
        this.visible=undefined;
       
      }else{
        this.mostrarNotificacao('Erro ao eliminar os user!',true)
      };
    });
  }

  getUser(){ 
    
    this.service.getUser(this.userForm.value.email!).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('User obtido com sucesso!',false)
        this.user = res;
        
        
        this.visible = this.user.userDTO;
      }else{
        this.mostrarNotificacao('Erro ao obter o user!',true)
      };
    });
  }


  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }
}
