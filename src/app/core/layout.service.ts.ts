import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Layout {
  sidebarCollapsed = signal<boolean>(false);
  lightModeLayout = signal<boolean>(false);

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleLightMode() {
    this.lightModeLayout.update((l) => !l);
  }
}
