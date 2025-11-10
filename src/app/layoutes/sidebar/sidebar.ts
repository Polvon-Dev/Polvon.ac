import { Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: true,
})
export class Sidebar implements OnInit {
  users: any = {};
  private layout = inject(LayoutService);
  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('isUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      this.users = Array.isArray(parsed) ? parsed[0] : parsed;

      if (this.users.role === 'student') {
        this.router.navigate(['/studentDashboard']);
      } else if (this.users.role === 'teacher') {
        this.router.navigate(['/teacherDashboard']);
      } else if (this.users.role === 'admin') {
        this.router.navigate(['/adminDashboard']);
      }
    } else {
      this.users = false;
      this.router.navigate(['']);
    }
  }

  collapsed = computed(() => this.layout.sidebarCollapsed());
}
