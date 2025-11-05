import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { selectHeader } from '../header/header.selector';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../header/header.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, Header, RouterOutlet, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  users: any = {};
  private store = inject(Store);
  isSidebarOpen = this.store.select(selectHeader);
  onToggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('signUpUsers');
    if (storedUser) {
      this.users = JSON.parse(storedUser);
    }
  }
}
