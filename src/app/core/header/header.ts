import { Component, inject } from '@angular/core';
import { LayoutService } from '../layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  private layout = inject(LayoutService);

  toggle() {
    this.layout.toggleSidebar();
  }
}
