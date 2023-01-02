import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  toDisplay = Boolean(localStorage.getItem("flag"));

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  tittle = 'EletricGO';



}

