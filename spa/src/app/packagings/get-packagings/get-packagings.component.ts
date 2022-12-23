import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Packaging } from '../packaging';
import { PackagingService } from '../packaging.service';

@Component({
  selector: 'app-get-packagings',
  templateUrl: './get-packagings.component.html',
  styleUrls: ['./get-packagings.component.css']
})
export class GetPackagingsComponent implements OnInit {

  packagings = null;
  selectedPackaging?: Packaging;

  constructor(private router: Router, private service : PackagingService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  async getPackagings(){ 

   (await this.service.getPackagings()).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false)

        
        
        this.packagings = res;


      }else{
        this.mostrarNotificacao('Erro ao obter as entregas!',true)
      };
    });
  }

  onSelect(packaging: Packaging): void {
    this.selectedPackaging = packaging;
  }
  



  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
