import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: 'light' | 'dark' = 'light';

  toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.theme = 'light';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.theme = 'dark';
    }
  }
  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      this.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      this.theme = 'light';
    }
  }
}
