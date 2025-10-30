import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHeader } from './header.selector';
import { toggleSidebar } from './header.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  private store = inject(Store);
  isSidebarOpen = this.store.selectSignal(selectHeader);
  theme: 'light' | 'dark' = 'light';

  onToggleSidebar() {
    console.log('Sidebar toggled!');
    this.store.dispatch(toggleSidebar());
  }

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.loadTheme();
    this.theme = this.themeService.theme;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.theme;
  }

  private layout = inject(LayoutService);

  toggle() {
    this.layout.toggleSidebar();
  }
}
