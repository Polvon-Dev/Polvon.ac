import { Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  ngOnInit(): void {
    const storedUser = localStorage.getItem('signUpUsers');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      this.users = Array.isArray(parsed) ? parsed[0] : parsed;
    }
  }

  collapsed = computed(() => this.layout.sidebarCollapsed());
}
