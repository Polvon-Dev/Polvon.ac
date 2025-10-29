import { Component } from '@angular/core';
import { Header } from '../layouts/header/header';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
