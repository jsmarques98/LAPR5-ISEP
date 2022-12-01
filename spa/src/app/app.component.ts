import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  toDisplay = true;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  tittle = 'EletricGO';

  toggleData() {
    this.toDisplay = !this.toDisplay;
    this.router.navigate(['/login']);
  }

}

