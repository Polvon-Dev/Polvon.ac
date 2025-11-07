import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  totalStudents: any;
  totalTeachers: any;
  role!: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    if (this.role == 'student') {
      this.http.get<any>(`http://localhost:3000/users?role=${this.role}`).subscribe({
        next: (data: any) => {
          console.log(data);
        },
      });
    }
  }
}
