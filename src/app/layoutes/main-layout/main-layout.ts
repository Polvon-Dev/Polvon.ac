import { Component, inject } from '@angular/core';
import { Header } from '../layouts/header/header';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { selectHeader } from '../layouts/header/header.selector';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../layouts/header/header.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, Header, RouterOutlet, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private store = inject(Store);
  isSidebarOpen = this.store.select(selectHeader);
  onToggleSidebar() {
    console.log('Sidebar toggled!');
    this.store.dispatch(toggleSidebar());
  }

  constructor() {
    this.isSidebarOpen.subscribe((val) => console.log('Sidebar holati:', val));
  }
}
