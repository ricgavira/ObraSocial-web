import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MenubarComponent } from '../menubar/menubar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgOptimizedImage, 
    MatCardModule, 
    MatDividerModule, 
    HeaderComponent,
    MenubarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
}