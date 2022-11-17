import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  createTrucks(){
    this.router.navigate(['/create-trucks']);
  }
}
