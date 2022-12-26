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

  packagings ;
  selectedPackaging?: Packaging;
  flag:boolean;

  constructor(private router: Router, private service : PackagingService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  getPackagings() { 
    
   this.service.getPackagings().subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false)
        this.packagings = res;
        
      }else{
        this.mostrarNotificacao('Erro ao obter as entregas!',true)
      };
    });
    this.flag=true
  }

  async orderByDate(){ 
   if( this.packagings==undefined){
    await this.getPackagings()
   }
  
   (await this.service.orderByDate(this.packagings)).subscribe(res => {
      if (res != null) {
        
        this.mostrarNotificacao('Entregas ordenadas com sucesso!',false)
        this.packagings = res;
        console.log("final")
        console.log(res)
      }else{
        this.mostrarNotificacao('Entregas ordenadas sem sucesso!',true)
      };
    });
   
  }

  async filterByDate(){ 
    if( this.packagings==undefined){
     await this.getPackagings()
    }
   
    (await this.service.filterByDate(this.packagings)).subscribe(res => {
       if (res != null) {
         
         this.mostrarNotificacao('Entregas filtradas com sucesso!',false)
         this.packagings = res;
         console.log("final")
         console.log(res)
       }else{
         this.mostrarNotificacao('Entregas filtradas sem sucesso!',true)
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
