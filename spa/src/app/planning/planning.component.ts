import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkAllRoutes(){
    this.router.navigate(['/check-all-routes']);
  }

}
