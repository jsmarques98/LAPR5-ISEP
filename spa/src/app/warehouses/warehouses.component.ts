import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createWarehouses(){
    this.router.navigate(['/create-warehouses']);
  }

}
