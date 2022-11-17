import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packagings',
  templateUrl: './packagings.component.html',
  styleUrls: ['./packagings.component.css']
})
export class PackagingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createPackagings(){
    this.router.navigate(['/create-packagings']);
  }

}
