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
  newArrayDate;
  newArrayWarehouse;

  constructor(private router: Router, private service : PackagingService,private notification:MatSnackBar) { }

  ngOnInit(): void {
  }

  async getPackagings() { 
   (await this.service.getPackagings()).subscribe(res => {
      if (res != null) {
        this.mostrarNotificacao('Entregas obtidas com sucesso!',false)
        this.packagings = res;
        
      }else{
        this.mostrarNotificacao('Erro ao obter as entregas!',true)
      };
    });    
     
    this.flag=true

  }
  
  
  
  getUniqueArrayDate() {
    const key = 'deliveryDate';  //use the key that contains the duplicate values.
    this.newArrayDate = [...new Map(this.packagings.map(item =>
      [item[key], item])).values()];
      return this.newArrayDate ;   //This newArray will have unique values.
  }

  getUniqueArrayWarehouse() {
    const key = 'deliveryWarehouseId';  //use the key that contains the duplicate values.
    this.newArrayWarehouse = [...new Map(this.packagings.map(item =>
      [item[key], item])).values()];
      return this.newArrayWarehouse ;   //This newArray will have unique values.
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

  async orderByWarehouseId(){ 
    if( this.packagings==undefined){
     await this.getPackagings()
    }
   
    (await this.service.orderByWarehouseId(this.packagings)).subscribe(res => {
       if (res != null) {
         
         this.mostrarNotificacao('Entregas ordenadas com sucesso!',false)
         this.packagings = res;
         this.mostrarNotificacao('Entregas ordenadas sem sucesso!',true)
       };
     });
    
   }

  async filterByDate(e){ 
    
    this.selectedPackaging = undefined;
    if( this.packagings==undefined){
     await this.getPackagings()
    }
   
    (await this.service.filterByDate(this.packagings,e.target.value)).subscribe(res => {
       if (res != null) {
         
         this.mostrarNotificacao('Entregas filtradas com sucesso!',false)
         this.packagings = res;
       }else{
         this.mostrarNotificacao('Entregas filtradas sem sucesso!',true)
       };
     });
    
   }

  async filterByWarehouseId(e){ 
    this.selectedPackaging = undefined;
  if( this.packagings==undefined){
    await this.getPackagings()
  }
  
  (await this.service.filterByWarehouseId(this.packagings,e.target.value)).subscribe(res => {
      if (res != null) {
        
        this.mostrarNotificacao('Entregas filtradas com sucesso!',false)
        this.packagings = res;
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
