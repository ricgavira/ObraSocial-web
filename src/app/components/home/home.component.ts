import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, MatCardModule, MatDividerModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router){}
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.length !== 0) {
        console.log('gavira token: ' + localStorage.getItem('token'));
      }
      else {
        localStorage.clear();
        this.router.navigate([""]);  
      }
    }
    else {
      this.router.navigate([""]);
    }
  }
}