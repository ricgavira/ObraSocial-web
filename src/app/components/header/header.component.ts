import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, 
            RouterModule,
            MatToolbarModule,
            MatCardModule,
            MatButtonModule,
            MatIconModule,
            MatSidenavModule
          ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
@Input() drawerIn!: MatDrawer;

  constructor(private router: Router){}

  onLogout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  onDrawer() {
    this.drawerIn.toggle();
  }
}
