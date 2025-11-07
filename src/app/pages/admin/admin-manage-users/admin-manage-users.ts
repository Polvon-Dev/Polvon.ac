import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-manage-users',
  imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './admin-manage-users.html',
  styleUrl: './admin-manage-users.css',
  standalone: true,
})
export class AdminManageUsers implements OnInit {
  searchEmail!: string;
  userEmails: any[] = [];
  totalStudents: any[] = [];
  totalTeachers: any[] = [];
  latestStudents: any[] = [];
  latestTeachers: any[] = [];
  role!: 'student' | 'teacher';
  totalCourses: any[] = [];
  users: any[] = [];
  totalEnrollments: any[] = [];
  totalPrice!: number;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUsers();
  }

  search() {
    this.http.get<any>(`http://localhost:3000/users`).subscribe({
      next: (data: any) => {
        this.users = data;
        const inputTitle = this.searchEmail.toLocaleLowerCase();
        const user = this.users.filter((d) => d.email.toLowerCase().includes(inputTitle));

        this.totalStudents = user.filter((u) => u.role === 'student');
        this.totalTeachers = user.filter((u) => u.role === 'teacher');
      },
    });
  }
  getUsers() {
    this.http.get<any>(`http://localhost:3000/users`).subscribe({
      next: (data: any) => {
        this.users = data;

        this.totalStudents = this.users.filter((d) => d.role == 'student');
        this.totalTeachers = this.users.filter((d) => d.role == 'teacher');
      },
    });
  }

  deleteUser(id: number) {
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.id !== id);

        this.totalStudents = this.users.filter((u) => u.role === 'student');
        this.totalTeachers = this.users.filter((u) => u.role === 'teacher');
      },
      error: (err) => console.error(err),
    });
  }
}
