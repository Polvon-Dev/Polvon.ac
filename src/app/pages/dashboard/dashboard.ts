import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
})
export class Dashboard implements OnInit {
  role!: string;
  users: any = {};

  ngOnInit(): void {
    const storedUser = localStorage.getItem('signUpUsers');
    if (storedUser) {
      this.users = JSON.parse(storedUser);
    }
  }
}
