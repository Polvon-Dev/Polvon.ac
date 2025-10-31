import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { RouterLink, ɵEmptyOutletComponent } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHeader } from './header.selector';
import { toggleSidebar } from './header.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ɵEmptyOutletComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  users: any = {};
  private store = inject(Store);
  isSidebarOpen = this.store.selectSignal(selectHeader);
  theme: 'light' | 'dark' = 'light';

  onToggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.loadTheme();
    this.theme = this.themeService.theme;
    let localeUsers = localStorage.getItem('isUser');
    let user = JSON.parse(localeUsers || '{}');
    this.users = user;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.theme;
  }

  private layout = inject(LayoutService);

  toggle() {
    this.layout.toggleSidebar();
  }

  login() {}
}
