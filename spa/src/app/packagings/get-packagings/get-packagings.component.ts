import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Packaging } from '../packaging';
import { PackagingService } from '../packaging.service';

@Component({
  selector: 'app-get-packagings',
  templateUrl: './get-packagings.component.html',
  styleUrls: ['./get-packagings.component.css']
})
export class GetPackagingsComponent implements OnInit {

  packagings ;
  packagings1 ;
  selectedPackaging?: Packaging;
  flag:boolean;
  dateFlag:boolean;
  idFlag:boolean;
  newArrayDate;
  newArrayWarehouse;
  filterDate;
  warehouse;
  date;
  filterWarehouse;

  constructor(private router: Router, private service : PackagingService,private notification:MatSnackBar) { }

  ngOnInit(): void {
    this.getPackagins1()
  }

   getPackagings() { 
    this.packagings = this.packagings1
    this.flag=true
    this.filterDate='default'
    this.filterWarehouse='default'
  }
  
  getPackagins1(){
    ( this.service.getPackagings()).pipe(switchMap (res =>this.service.getinfoDeliveriesForPackagings(res))).subscribe(res1=>{this.packagings1=res1});
  }
  
  async getUniqueArrayDate() {
    await this.getPackagins1()
    let a    
    a = new Set(this.packagings1.map(packaging=>packaging.deliveryDate))
    this.newArrayDate = Array.from(a);
    return this.newArrayDate
  }

  async getUniqueArrayWarehouse() {
    await this.getPackagins1()
    let a    
    a = new Set(this.packagings1.map(packaging=>packaging.deliveryWarehouseId))
    this.newArrayWarehouse = Array.from(a);
    return this.newArrayWarehouse
  }

  async orderByDate(){ 
   if( this.packagings1==undefined){
    await this.getPackagings()
   }
  
   (await this.service.orderByDate(this.packagings)).subscribe(res => {
      if (res != null) {
        
        this.mostrarNotificacao('Entregas ordenadas com sucesso!',false)
        this.packagings = res;
      }else{
        this.mostrarNotificacao('Entregas ordenadas sem sucesso!',true)
      };
    });
   
  }

  async orderByWarehouseId(){ 
    if( this.packagings1==undefined){
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

  async filterByDate(date: string, list:Array<any>):Promise<Observable<any>>{  
    let a
        
    (await this.service.filterByDate(list,date)).subscribe(res => {

       if (res.length != 0) {
         
         this.mostrarNotificacao('Entregas filtradas com sucesso!',false)
         a = res;
       }else{
         this.mostrarNotificacao('Não existem entregas para estes filtros!',true)
       };
     }); 
     return a
   }

  async filterByWarehouseId(id: string, list:Array<any>):Promise<Observable<any>>{ 
    let a
  
  (await this.service.filterByWarehouseId(list,id)).subscribe(res => {
      if (res.length != 0) {
        this.mostrarNotificacao('Entregas filtradas com sucesso!',false)
        a=res
      }else{
        this.mostrarNotificacao('Não existem entregas para estes filtros!',true)
      };
    });
    
    return a
  }


  async filterDateAndWarehouse(e){
    this.selectedPackaging = undefined

    const a = e.target.innerText
    const b = a.split('\n')
    let c
    
    if(b[0] === "Filter by WarehouseId"){
      if(this.dateFlag){
        c = await this.filterByDate(this.date,this.packagings1) 
      }else{
        c = this.packagings1
      }
      if (e.target.value === "default") {
        this.idFlag = false
        this.packagings = c
      }else{
        this.idFlag =true
        this.warehouse = e.target.value
            
        this.packagings = await this.filterByWarehouseId(e.target.value,c) 
      }   
    }

    if(b[0] === "Filter by Date"){
      if(this.idFlag){
        c = await this.filterByWarehouseId(this.warehouse,this.packagings1)
      }else{
        c = this.packagings1
      }  
        if (e.target.value === "default") {
          this.dateFlag = false
          this.packagings = c
        }else{
          this.dateFlag =true
          this.date = e.target.value
          this.packagings = await this.filterByDate(e.target.value,c)
        }
      }   

  }
  

  onSelect(packaging: Packaging): void {
    this.selectedPackaging = packaging;
  }
  



  private mostrarNotificacao(mensagem: string, falha: boolean) {
    var snackbarColor = falha ? 'red-snackbar' : 'green-snackbar';
    this.notification.open(mensagem, 'Close', {duration: 4000, panelClass: [snackbarColor]});
  }

}
