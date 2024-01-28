import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, 
            MatCardModule,
            MatButtonModule,
            MatIconModule
          ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router){}

  onHome(){
    this.router.navigate(['home']);
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
