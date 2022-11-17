import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-section',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createSection(){
    this.router.navigate(['/create-section']);
  }
}