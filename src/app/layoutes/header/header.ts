import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHeader } from './header.selector';
import { toggleSidebar } from './header.actions';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  users: any = {};
  isUsers: any[] = [];
  showLogOut = false;
  private store = inject(Store);
  isSidebarOpen = this.store.selectSignal(selectHeader);
  theme: 'light' | 'dark' = 'light';

  onToggleSidebar() {
    this.store.dispatch(toggleSidebar());
  }

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.themeService.loadTheme();
    this.theme = this.themeService.theme;
    const localeUsers = localStorage.getItem('isUser');
    if (localeUsers) {
      try {
        const user = JSON.parse(localeUsers);
        if (user && Object.keys(user).length > 0) {
          this.users = user;
        } else {
          this.users = null;
        }
      } catch (e) {
        this.users = null;
      }
    } else {
      this.users = null;
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.theme;
  }

  getUser() {
    if (this.users.role == 'student') {
      this.route.navigate(['']);
    } else if (this.users.role == 'teacher') {
      this.route.navigate(['/teacherDashboard']);
    } else if (this.users.role == 'admin') {
      this.route.navigate(['/adminDashboard']);
    } else {
    }
  }

  private layout = inject(LayoutService);

  toggle() {
    this.layout.toggleSidebar();
  }

  toggleLogout() {
    this.showLogOut = !this.showLogOut;
    this.cdr.detectChanges();
  }

  logOut() {
    localStorage.removeItem('isUser');
    this.users = null;
    this.showLogOut = false;
    window.location.reload();
  }
}
